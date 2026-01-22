import { Injectable, inject, signal } from "@angular/core";
import { finalize } from "rxjs";
import { ViaCepApi } from "../apis/via-cep.api";

@Injectable({
  providedIn: "root"
})
export class ViaCepService {
  private api = inject(ViaCepApi);
  isLoading = signal<boolean>(false);

  getAddressByZipCode(zipCode: string) {
    this.isLoading.set(true);
    return this.api.getAddress(zipCode).pipe(finalize(() => this.isLoading.set(false)));
  }
}
