import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { AppointmentApi } from "../apis/appointment.api";
import { IAppointment, ICreateAppointment, IUpdateAppointment } from "../interfaces/appointment.interface";

@Injectable({
  providedIn: "root"
})
export class AppointmentService {
  private api = inject(AppointmentApi);

  // State
  appointmentsSignal = signal<IAppointment[]>([]);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public appointments = computed(() => this.appointmentsSignal());
  public totalItems = computed(() => this.totalItemsSignal());
  public page = computed(() => this.pageSignal());
  public pageSize = computed(() => this.pageSizeSignal());

  loadSchedule(date: string) {
    // YYYY-MM-DD
    this.loading.set(true);
    this.api
      .getSchedule(date)
      .pipe(
        tap((data) => this.appointmentsSignal.set(data)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

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
          this.appointmentsSignal.set(response.data ?? []);
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

  create(payload: ICreateAppointment) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.appointmentsSignal.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: IUpdateAppointment) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.appointmentsSignal.update((list) => list.map((a) => (a.id === id ? updated : a)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.appointmentsSignal.update((list) => list.filter((a) => a.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
