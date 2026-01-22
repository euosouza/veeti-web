import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { IMedicalRecord } from "../interfaces/medical-record.interface";

@Injectable({ providedIn: "root" })
export class MedicalRecordApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/medical-records`;

  getRecord(petId: string): Observable<IMedicalRecord> {
    return this.http.get<IMedicalRecord>(`${this.apiUrl}/${petId}?_expand=pet`);
  }
}
