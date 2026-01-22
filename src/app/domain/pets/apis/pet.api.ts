import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { IPaginatedResponse } from "src/app/shared/interfaces/paginated-response.interface";
import { ICreatePet, IPet } from "../interfaces/pet.interface";

@Injectable({
  providedIn: "root"
})
export class PetApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/pets`;

  getAll(query?: string, page = 1, limit = 10) {
    const params: Record<string, string | number> = {
      _page: page,
      _per_page: limit,
      _embed: "tutor"
    };
    if (query) {
      params["name"] = query;
    }
    return this.http.get<IPaginatedResponse<IPet>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<IPet> {
    const params = { _embed: "tutor" };
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
