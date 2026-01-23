import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { DocumentTemplateApi } from "../apis/document-template.api";
import { ICreateDocumentTemplate, IDocumentTemplate, IUpdateDocumentTemplate } from "../interfaces/document-template.interface";

@Injectable({
  providedIn: "root"
})
export class DocumentTemplateService {
  private api = inject(DocumentTemplateApi);

  // State
  templates = signal<IDocumentTemplate[]>([]);
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
          this.templates.set(response.data ?? []);
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

  create(payload: ICreateDocumentTemplate) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.templates.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateDocumentTemplate) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.templates.update((list) => list.map((t) => (t.id === id ? updated : t)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.templates.update((list) => list.filter((t) => t.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
