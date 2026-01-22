import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export interface IViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ViaCepApi {
  private http = inject(HttpClient);

  getAddress(zipCode: string): Observable<IViaCepResponse> {
    // Remove non-digits
    const cleanZip = zipCode.replace(/\D/g, "");
    return this.http.get<IViaCepResponse>(`https://viacep.com.br/ws/${cleanZip}/json/`);
  }
}
