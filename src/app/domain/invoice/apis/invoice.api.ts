import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateInvoice, IInvoice, IUpdateInvoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root"
})
export class InvoiceApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/invoices`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IInvoice>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IInvoice>>(this.apiUrl, { params }).pipe(
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

  getById(id: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateInvoice): Observable<IInvoice> {
    return this.http.post<IInvoice>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateInvoice): Observable<IInvoice> {
    return this.http.patch<IInvoice>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
