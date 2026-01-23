import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { UserApi } from "../apis/user.api";
import { ICreateUser, IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private api = inject(UserApi);

  // State
  private usersSignal = signal<IUser[]>([]);
  currentUser = signal<IUser | null>(null);
  loading = signal<boolean>(false);
  private totalItemsSignal = signal<number>(0);
  private pageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(10);

  // Selectors
  public users = computed(() => this.usersSignal());
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
          this.usersSignal.set(response.data ?? []);
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
        tap((user) => this.currentUser.set(user)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  create(payload: ICreateUser) {
    this.loading.set(true);
    return this.api.create(payload).pipe(
      tap((newItem) => this.usersSignal.update((list) => [...list, newItem])),
      finalize(() => this.loading.set(false))
    );
  }

  update(id: string, payload: Partial<IUser>) {
    this.loading.set(true);
    return this.api.update(id, payload).pipe(
      tap((updated) => this.usersSignal.update((list) => list.map((u) => (u.id === id ? updated : u)))),
      finalize(() => this.loading.set(false))
    );
  }

  delete(id: string) {
    this.loading.set(true);
    return this.api.delete(id).pipe(
      tap(() => this.usersSignal.update((list) => list.filter((u) => u.id !== id))),
      finalize(() => this.loading.set(false))
    );
  }
}
