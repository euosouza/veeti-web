import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { InvoiceApi } from "../apis/invoice.api";
import { ICreateInvoice, IInvoice, IUpdateInvoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  private api = inject(InvoiceApi);

  // State
  invoicesSignal = signal<IInvoice[]>([]);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public invoices = computed(() => this.invoicesSignal());
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
          this.invoicesSignal.set(response.data ?? []);
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

  create(payload: ICreateInvoice) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.invoicesSignal.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateInvoice) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.invoicesSignal.update((list) => list.map((i) => (i.id === id ? updated : i)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.invoicesSignal.update((list) => list.filter((i) => i.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
