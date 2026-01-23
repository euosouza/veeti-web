import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { IAttachment, ICreateAttachment, IUpdateAttachment } from "../interfaces/attachment.interface";

@Injectable({
  providedIn: "root"
})
export class AttachmentApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/attachments`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IAttachment>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit
    };

    if (options.search) {
      params["q"] = options.search;
    }

    return this.http.get<IPaginatedResponse<IAttachment>>(this.apiUrl, { params }).pipe(
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

  getByPetId(petId: string): Observable<IAttachment[]> {
    return this.http.get<IAttachment[]>(`${this.apiUrl}?petId=${petId}`);
  }

  create(payload: ICreateAttachment): Observable<IAttachment> {
    return this.http.post<IAttachment>(this.apiUrl, payload);
  }

  update(id: string, payload: IUpdateAttachment): Observable<IAttachment> {
    return this.http.patch<IAttachment>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
