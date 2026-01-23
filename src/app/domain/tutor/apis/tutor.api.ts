// src/app/features/tutors/api/tutor.api.ts
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateTutor, ITutor, IUpdateTutor } from "../interfaces/tutor.interface";

@Injectable({
  providedIn: "root"
})
export class TutorApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tutors`;

  getAll(options: QueryOptions): Observable<PaginatedResult<ITutor>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["fullName"] = options.search;
    }

    return this.http.get<IPaginatedResponse<ITutor>>(this.baseUrl, { params }).pipe(
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

  getById(id: string): Observable<ITutor> {
    return this.http.get<ITutor>(`${this.baseUrl}/${id}`);
  }

  create(payload: ICreateTutor): Observable<ITutor> {
    return this.http.post<ITutor>(this.baseUrl, payload);
  }

  update(id: string, payload: IUpdateTutor): Observable<ITutor> {
    return this.http.patch<ITutor>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
