// src/app/features/tutors/api/tutor.api.ts
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { ICreateTutor, ITutor, IUpdateTutor } from "../interfaces/tutor.interface";

@Injectable({
  providedIn: "root"
})
export class TutorApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tutors`;

  getAll(): Observable<ITutor[]> {
    return this.http.get<ITutor[]>(this.baseUrl);
  }

  getById(id: string): Observable<ITutor> {
    return this.http.get<ITutor>(`${this.baseUrl}/${id}`);
  }

  create(payload: ICreateTutor): Observable<ITutor> {
    return this.http.post<ITutor>(this.baseUrl, payload);
  }

  update(id: string, payload: IUpdateTutor): Observable<ITutor> {
    return this.http.patch<ITutor>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
