import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateVeterinarian, IUpdateVeterinarian, IVeterinarian } from "../interfaces/veterinarian.interface";

@Injectable({
  providedIn: "root"
})
export class VeterinarianApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/veterinarians`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IVeterinarian>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["name"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IVeterinarian>>(this.apiUrl, { params }).pipe(
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

  getById(id: string): Observable<IVeterinarian> {
    return this.http.get<IVeterinarian>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateVeterinarian): Observable<IVeterinarian> {
    return this.http.post<IVeterinarian>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateVeterinarian): Observable<IVeterinarian> {
    return this.http.patch<IVeterinarian>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
