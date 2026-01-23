import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ClinicalAlertApi } from "../apis/clinical-alert.api";
import { IClinicalAlert, ICreateClinicalAlert, IUpdateClinicalAlert } from "../interfaces/clinical-alert.interface";

@Injectable({
  providedIn: "root"
})
export class ClinicalAlertService {
  private api = inject(ClinicalAlertApi);

  // State
  alerts = signal<IClinicalAlert[]>([]);
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
          this.alerts.set(response.data ?? []);
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
        tap((data) => this.alerts.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateClinicalAlert) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.alerts.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateClinicalAlert) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.alerts.update((list) => list.map((a) => (a.id === id ? updated : a)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.alerts.update((list) => list.filter((a) => a.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
