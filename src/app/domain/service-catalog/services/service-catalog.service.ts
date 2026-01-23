import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ServiceCatalogApi } from "../apis/service-catalog.api";
import { ICreateServiceCatalog, IServiceCatalog, IUpdateServiceCatalog } from "../interfaces/service-catalog.interface";

@Injectable({
  providedIn: "root"
})
export class ServiceCatalogService {
  private api = inject(ServiceCatalogApi);

  // State
  services = signal<IServiceCatalog[]>([]);
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
          this.services.set(response.data ?? []);
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

  create(payload: ICreateServiceCatalog) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.services.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateServiceCatalog) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.services.update((list) => list.map((s) => (s.id === id ? updated : s)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.services.update((list) => list.filter((s) => s.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
