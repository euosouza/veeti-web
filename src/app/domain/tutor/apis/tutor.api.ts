// src/app/features/tutors/api/tutor.api.ts
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { ICreateTutor, ITutor, IUpdateTutor } from "../interfaces/tutor.interface";

@Injectable({
  providedIn: "root"
})
export class TutorApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tutors`;

  getAll(query?: string, page = 1, limit = 10) {
    const params: Record<string, string | number> = {
      _page: page,
      _per_page: limit
    };
    if (query) {
      params["fullName"] = query;
    }
    return this.http.get<IPaginatedResponse<ITutor>>(this.baseUrl, { params });
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
