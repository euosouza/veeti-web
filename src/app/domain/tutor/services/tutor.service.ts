// src/app/features/tutors/services/tutor.service.ts
import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs";
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

  // --- Selectors (Computed) ---
  public tutors = computed(() => this.tutorsSignal());
  public isLoading = computed(() => this.loadingSignal());

  // --- Actions ---

  loadAll() {
    this.loadingSignal.set(true);
    return this.api.getAll().pipe(
      tap((data) => this.tutorsSignal.set(data)),
      finalize(() => this.loadingSignal.set(false))
    );
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
}
