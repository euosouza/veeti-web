import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ReminderApi } from "../apis/reminder.api";
import { ICreateReminder, IReminder, IUpdateReminder } from "../interfaces/reminder.interface";

@Injectable({
  providedIn: "root"
})
export class ReminderService {
  private api = inject(ReminderApi);

  // State
  reminders = signal<IReminder[]>([]);
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
          this.reminders.set(response.data ?? []);
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

  loadPending() {
    this.loading.set(true);
    this.api
      .getPending()
      .pipe(
        tap((data) => this.reminders.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateReminder) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.reminders.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateReminder) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.reminders.update((list) => list.map((r) => (r.id === id ? updated : r)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.reminders.update((list) => list.filter((r) => r.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
