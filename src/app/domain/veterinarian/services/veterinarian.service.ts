import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { VeterinarianApi } from "../apis/veterinarian.api";
import { ICreateVeterinarian, IUpdateVeterinarian, IVeterinarian } from "../interfaces/veterinarian.interface";

@Injectable({
  providedIn: "root"
})
export class VeterinarianService {
  private api = inject(VeterinarianApi);

  // State
  private veterinariansSignal = signal<IVeterinarian[]>([]);
  currentVeterinarian = signal<IVeterinarian | null>(null);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public veterinarians = computed(() => this.veterinariansSignal());
  public totalItems = computed(() => this.totalItemsSignal());
  public page = computed(() => this.pageSignal());
  public pageSize = computed(() => this.pageSizeSignal());

  loadAll(query?: string) {
    this.loading.set(true);

    const options: QueryOptions = {
      page: this.pageSignal(),
      limit: this.pageSizeSignal(),
      search: query
    };

    return this.api
      .getAll(options)
      .pipe(
        tap((response) => {
          this.veterinariansSignal.set(response.data ?? []);
          this.totalItemsSignal.set(response.meta.total ?? 0);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  setPage(page: number) {
    this.pageSignal.set(page);
  }

  setPageSize(size: number) {
    this.pageSizeSignal.set(size);
    this.pageSignal.set(1);
  }

  loadById(id: string) {
    this.loading.set(true);
    this.api
      .getById(id)
      .pipe(
        tap((vet) => this.currentVeterinarian.set(vet)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateVeterinarian) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.veterinariansSignal.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateVeterinarian) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.veterinariansSignal.update((list) => list.map((v) => (v.id === id ? updated : v)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.veterinariansSignal.update((list) => list.filter((v) => v.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
