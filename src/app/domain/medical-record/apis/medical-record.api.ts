import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateMedicalRecord, IMedicalRecord, IUpdateMedicalRecord } from "../interfaces/medical-record.interface";

@Injectable({
  providedIn: "root"
})
export class MedicalRecordApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/medical-records`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IMedicalRecord>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IMedicalRecord>>(this.apiUrl, { params }).pipe(
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

  getByPetId(petId: string): Observable<IMedicalRecord[]> {
    return this.http.get<IMedicalRecord[]>(`${this.apiUrl}?petId=${petId}`);
  }

  getById(id: string): Observable<IMedicalRecord> {
    return this.http.get<IMedicalRecord>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateMedicalRecord): Observable<IMedicalRecord> {
    return this.http.post<IMedicalRecord>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateMedicalRecord): Observable<IMedicalRecord> {
    return this.http.patch<IMedicalRecord>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
