import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateReminder, IReminder, IUpdateReminder } from "../interfaces/reminder.interface";

@Injectable({
  providedIn: "root"
})
export class ReminderApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/reminders`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IReminder>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["title"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IReminder>>(this.apiUrl, { params }).pipe(
      map((response) => ({
        data: response.data,
        meta: {
          total: response.items,
          page: options.page,
          last_page: response.pages
        }
      }))
    );
  }

  getPending(): Observable<IReminder[]> {
    return this.http.get<IReminder[]>(`${this.apiUrl}?sentAt=null`);
  }

  create(payload: ICreateReminder): Observable<IReminder> {
    return this.http.post<IReminder>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateReminder): Observable<IReminder> {
    return this.http.patch<IReminder>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
