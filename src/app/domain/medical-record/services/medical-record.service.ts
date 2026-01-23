import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { MedicalRecordApi } from "../apis/medical-record.api";
import { ICreateMedicalRecord, IMedicalRecord, IUpdateMedicalRecord } from "../interfaces/medical-record.interface";

@Injectable({
  providedIn: "root"
})
export class MedicalRecordService {
  private api = inject(MedicalRecordApi);

  // State
  recordsSignal = signal<IMedicalRecord[]>([]);
  currentRecord = signal<IMedicalRecord | null>(null);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public records = computed(() => this.recordsSignal());
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
          this.recordsSignal.set(response.data ?? []);
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
        tap((data) => this.recordsSignal.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  loadById(id: string) {
    this.loading.set(true);
    this.api
      .getById(id)
      .pipe(
        tap((record) => this.currentRecord.set(record)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateMedicalRecord) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newRecord) => this.recordsSignal.update((list) => [...list, newRecord])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateMedicalRecord) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.recordsSignal.update((list) => list.map((r) => (r.id === id ? updated : r)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.recordsSignal.update((list) => list.filter((r) => r.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
