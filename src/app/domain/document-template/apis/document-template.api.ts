import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateDocumentTemplate, IDocumentTemplate, IUpdateDocumentTemplate } from "../interfaces/document-template.interface";

@Injectable({
  providedIn: "root"
})
export class DocumentTemplateApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/document-templates`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IDocumentTemplate>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IDocumentTemplate>>(this.apiUrl, { params }).pipe(
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

  getById(id: string): Observable<IDocumentTemplate> {
    return this.http.get<IDocumentTemplate>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateDocumentTemplate): Observable<IDocumentTemplate> {
    return this.http.post<IDocumentTemplate>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateDocumentTemplate): Observable<IDocumentTemplate> {
    return this.http.patch<IDocumentTemplate>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
