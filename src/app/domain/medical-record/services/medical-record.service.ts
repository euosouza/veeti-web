import { Injectable, inject, signal } from "@angular/core";
import { finalize, tap } from "rxjs";
import { MedicalRecordApi } from "../apis/medical-record.api";
import { IMedicalRecord } from "../interfaces/medical-record.interface";

@Injectable({ providedIn: "root" })
export class MedicalRecordService {
  private api = inject(MedicalRecordApi);

  // State
  readonly isLoading = signal(false);
  readonly currentRecord = signal<IMedicalRecord | null>(null);

  /**
   * Carrega o prontuário completo de um animal
   * Por enquanto, carrega os dados do Pet. No futuro, carregará histórico, vacinas, etc.
   */
  loadRecord(petId: string) {
    this.isLoading.set(true);

    // Simulação de carregamento de prontuário
    // Na prática, o backend deve ter um endpoint GET /medical-records/:id que retorna o agregado
    return this.api.getRecord(petId).pipe(
      tap((record) => {
        this.currentRecord.set(record);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
