import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { PaginatedResult } from "src/app/shared/interfaces/paginated-result.interface";
import { QueryOptions } from "src/app/shared/interfaces/query-options.interface";
import { ICreatePet, IPet } from "../interfaces/pet.interface";

@Injectable({
  providedIn: "root"
})
export class PetApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/pets`;

  getAll(options: QueryOptions): Observable<PaginatedResult<IPet>> {
    const params: Record<string, string | number> = {
      _page: options.page,
      _per_page: options.limit,
      _expand: "tutor"
    };

    if (options.search) {
      params["name"] = options.search;
    }

    // Adaptando a resposta do json-server (IPaginatedResponse) para o formato solicitado (PaginatedResult)
    return this.http.get<IPaginatedResponse<IPet>>(this.baseUrl, { params }).pipe(
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

  getById(id: string): Observable<IPet> {
    const params = { _expand: "tutor", _embed: "memories" };
    return this.http.get<IPet>(`${this.baseUrl}/${id}`, { params });
  }

  create(payload: ICreatePet): Observable<IPet> {
    return this.http.post<IPet>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<ICreatePet>): Observable<IPet> {
    return this.http.patch<IPet>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
