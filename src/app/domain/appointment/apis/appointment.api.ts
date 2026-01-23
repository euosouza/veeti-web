import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { IAppointment, ICreateAppointment, IUpdateAppointment } from "../interfaces/appointment.interface";

@Injectable({
  providedIn: "root"
})
export class AppointmentApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/appointments`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IAppointment>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      // Assuming we search by notes or status? Or specific filter?
      // For generic search, maybe 'q' if json-server supports it, or specific field.
      // Let's use 'q' for general text search if supported, or just map to a likely field like 'notes'.
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IAppointment>>(this.apiUrl, { params }).pipe(
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

  // Example filter params
  getSchedule(date: string, veterinarianId?: string): Observable<IAppointment[]> {
    let url = `${this.apiUrl}?date_like=${date}`; // Simple json-server like query
    if (veterinarianId) url += `&veterinarianId=${veterinarianId}`;
    return this.http.get<IAppointment[]>(url);
  }

  getById(id: string): Observable<IAppointment> {
    return this.http.get<IAppointment>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateAppointment): Observable<IAppointment> {
    return this.http.post<IAppointment>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateAppointment): Observable<IAppointment> {
    return this.http.patch<IAppointment>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
