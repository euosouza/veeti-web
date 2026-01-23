import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreateQuote, IQuote, IUpdateQuote } from "../interfaces/quote.interface";

@Injectable({
  providedIn: "root"
})
export class QuoteApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/quotes`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IQuote>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      // Assuming generic search on json-server 'q' parameter or a specific field
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IQuote>>(this.apiUrl, { params }).pipe(
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

  getById(id: string): Observable<IQuote> {
    return this.http.get<IQuote>(`${this.apiUrl}/${id}`);
  }

  create(payload: ICreateQuote): Observable<IQuote> {
    return this.http.post<IQuote>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateQuote): Observable<IQuote> {
    return this.http.patch<IQuote>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
