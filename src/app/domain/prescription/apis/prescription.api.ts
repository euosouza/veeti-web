import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreatePrescription, IPrescription, IUpdatePrescription } from "../interfaces/prescription.interface";

@Injectable({
  providedIn: "root"
})
export class PrescriptionApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/prescriptions`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IPrescription>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IPrescription>>(this.apiUrl, { params }).pipe(
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

  getByPetId(petId: string): Observable<IPrescription[]> {
    return this.http.get<IPrescription[]>(`${this.apiUrl}?petId=${petId}`);
  }

  getById(id: string): Observable<IPrescription> {
    return this.http.get<IPrescription>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreatePrescription): Observable<IPrescription> {
    return this.http.post<IPrescription>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdatePrescription): Observable<IPrescription> {
    return this.http.patch<IPrescription>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
