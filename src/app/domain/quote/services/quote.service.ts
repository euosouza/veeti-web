import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { QuoteApi } from "../apis/quote.api";
import { ICreateQuote, IQuote, IUpdateQuote } from "../interfaces/quote.interface";

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  private api = inject(QuoteApi);

  // State
  quotesSignal = signal<IQuote[]>([]);
  currentQuote = signal<IQuote | null>(null);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public quotes = computed(() => this.quotesSignal());
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
          this.quotesSignal.set(response.data ?? []);
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

  create(payload: ICreateQuote) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.quotesSignal.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateQuote) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.quotesSignal.update((list) => list.map((q) => (q.id === id ? updated : q)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.quotesSignal.update((list) => list.filter((q) => q.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
