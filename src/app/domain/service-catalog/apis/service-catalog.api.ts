import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateServiceCatalog, IServiceCatalog, IUpdateServiceCatalog } from "../interfaces/service-catalog.interface";

@Injectable({
  providedIn: "root"
})
export class ServiceCatalogApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/services`; // 'services' table in DB

  getAll(options: QueryOptions): Observable<PaginatedResult<IServiceCatalog>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["name"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IServiceCatalog>>(this.apiUrl, { params }).pipe(
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

  create(payload: ICreateServiceCatalog): Observable<IServiceCatalog> {
    return this.http.post<IServiceCatalog>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateServiceCatalog): Observable<IServiceCatalog> {
    return this.http.patch<IServiceCatalog>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
