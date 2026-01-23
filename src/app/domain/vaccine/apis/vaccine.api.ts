import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateVaccine, IUpdateVaccine, IVaccine } from "../interfaces/vaccine.interface";

@Injectable({
  providedIn: "root"
})
export class VaccineApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/vaccines`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IVaccine>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IVaccine>>(this.apiUrl, { params }).pipe(
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

  getByPetId(petId: string): Observable<IVaccine[]> {
    return this.http.get<IVaccine[]>(`${this.apiUrl}?petId=${petId}`);
  }

  create(payload: ICreateVaccine): Observable<IVaccine> {
    return this.http.post<IVaccine>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateVaccine): Observable<IVaccine> {
    return this.http.patch<IVaccine>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
