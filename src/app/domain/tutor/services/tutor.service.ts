// src/app/features/tutors/services/tutor.service.ts
import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, map, tap } from "rxjs";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { TutorApi } from "../apis/tutor.api";
import { ICreateTutor, ITutor, IUpdateTutor } from "../interfaces/tutor.interface";

@Injectable({
  providedIn: "root"
})
export class TutorService {
  private api = inject(TutorApi);

  // --- State (Signals) ---
  private tutorsSignal = signal<ITutor[]>([]);
  private loadingSignal = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(5);

  // --- Selectors (Computed) ---
  public tutors = computed(() => this.tutorsSignal());
  public isLoading = computed(() => this.loadingSignal());
  public totalItems = computed(() => this.totalItemsSignal());
  public page = computed(() => this.pageSignal());
  public pageSize = computed(() => this.pageSizeSignal());

  // --- Actions ---

  loadAll(query?: string) {
    this.loadingSignal.set(true);

    const options: QueryOptions = {
      page: this.pageSignal(),
      limit: this.pageSizeSignal(),
      search: query
    };

    return this.api.getAll(options).pipe(
      tap((response) => {
        this.tutorsSignal.set(response.data ?? []);
        this.totalItemsSignal.set(response.meta.total ?? 0);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  getById(id: string) {
    this.loadingSignal.set(true);
    return this.api.getById(id).pipe(finalize(() => this.loadingSignal.set(false)));
  }

  setPage(page: number) {
    this.pageSignal.set(page);
  }

  setPageSize(size: number) {
    this.pageSizeSignal.set(size);
    this.pageSignal.set(1); // Reset to first page on size change
  }

  create(payload: ICreateTutor) {
    this.loadingSignal.set(true);
    return this.api.create(payload).pipe(
      tap((newTutor) => {
        // Atualização otimista/local da lista
        this.tutorsSignal.update((list) => [newTutor, ...list]);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  update(id: string, payload: IUpdateTutor) {
    this.loadingSignal.set(true);
    return this.api.update(id, payload).pipe(
      tap((updatedTutor) => {
        this.tutorsSignal.update((list) => list.map((t) => (t.id === id ? updatedTutor : t)));
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  remove(id: string) {
    this.loadingSignal.set(true);
    return this.api.delete(id).pipe(
      tap(() => {
        this.tutorsSignal.update((list) => list.filter((t) => t.id !== id));
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  getAllTutors() {
    return this.api.getAll({ page: 1, limit: 1000 }).pipe(map((response) => response.data));
  }
}
