import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { IClinicalAlert, ICreateClinicalAlert, IUpdateClinicalAlert } from "../interfaces/clinical-alert.interface";

@Injectable({
  providedIn: "root"
})
export class ClinicalAlertApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/clinical-alerts`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IClinicalAlert>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IClinicalAlert>>(this.apiUrl, { params }).pipe(
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

  getByPetId(petId: string): Observable<IClinicalAlert[]> {
    return this.http.get<IClinicalAlert[]>(`${this.apiUrl}?petId=${petId}`);
  }

  create(payload: ICreateClinicalAlert): Observable<IClinicalAlert> {
    return this.http.post<IClinicalAlert>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateClinicalAlert): Observable<IClinicalAlert> {
    return this.http.patch<IClinicalAlert>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
