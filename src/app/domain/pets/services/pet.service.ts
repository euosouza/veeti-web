import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs";
import { PetApi } from "../apis/pet.api";
import { ICreatePet, IPet } from "../interfaces/pet.interface";

@Injectable({
  providedIn: "root"
})
export class PetService {
  private api = inject(PetApi);

  // --- State (Signals) ---
  private petsSignal = signal<IPet[]>([]);
  private loadingSignal = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(5);

  // --- Selectors (Computed) ---
  public pets = computed(() => this.petsSignal());
  public isLoading = computed(() => this.loadingSignal());
  public totalItems = computed(() => this.totalItemsSignal());
  public page = computed(() => this.pageSignal());
  public pageSize = computed(() => this.pageSizeSignal());

  // --- Actions ---

  loadAll(query?: string) {
    this.loadingSignal.set(true);
    return this.api.getAll(query, this.pageSignal(), this.pageSizeSignal()).pipe(
      tap((response) => {
        this.petsSignal.set(response.data ?? []);
        this.totalItemsSignal.set(response.items ?? 0);
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

  create(payload: ICreatePet) {
    this.loadingSignal.set(true);
    return this.api.create(payload).pipe(
      tap((newPet) => {
        // Atualização otimista/local da lista
        this.petsSignal.update((list) => [newPet, ...list]);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  update(id: string, payload: Partial<ICreatePet>) {
    this.loadingSignal.set(true);
    return this.api.update(id, payload).pipe(
      tap((updatedPet) => {
        this.petsSignal.update((list) => list.map((p) => (p.id === id ? updatedPet : p)));
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  remove(id: string) {
    this.loadingSignal.set(true);
    return this.api.delete(id).pipe(
      tap(() => {
        this.petsSignal.update((list) => list.filter((p) => p.id !== id));
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }
}
