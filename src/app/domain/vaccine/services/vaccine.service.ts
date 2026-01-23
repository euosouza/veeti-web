import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { VaccineApi } from "../apis/vaccine.api";
import { ICreateVaccine, IUpdateVaccine, IVaccine } from "../interfaces/vaccine.interface";

@Injectable({
  providedIn: "root"
})
export class VaccineService {
  private api = inject(VaccineApi);

  // State
  vaccines = signal<IVaccine[]>([]);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
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
          this.vaccines.set(response.data ?? []);
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

  loadByPetId(petId: string) {
    this.loading.set(true);
    this.api
      .getByPetId(petId)
      .pipe(
        tap((data) => this.vaccines.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateVaccine) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.vaccines.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateVaccine) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.vaccines.update((list) => list.map((v) => (v.id === id ? updated : v)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.vaccines.update((list) => list.filter((v) => v.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
