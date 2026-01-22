// src/app/domain/medical-record/interfaces/medical-record.interface.ts

import { IPet } from "@domain/pets/interfaces/pet.interface";

// Interface principal do Prontuário (O Hub Central)
export interface IMedicalRecord {
  pet: IPet;

  // Estatísticas e Resumo para o Header
  stats: IMedicalRecordStats;

  // Alertas Críticos (Dashboard de Risco)
  alerts: {
    allergies: string[]; // Ex: ["Dipirona", "Proteína de Frango"]
    chronicConditions: string[]; // Ex: ["Insuficiência Renal", "Cardiopata"]
    activeTreatments?: string[]; // Ex: ["Antibiótico - 3 dias restantes"]
  };

  // Dados das Abas (Podem vir populados ou serem carregados sob demanda futuramente)
  summary?: {
    lastDiagnosis?: string;
    bloodType?: string;
  };
}

// Estatísticas rápidas para tomada de decisão visual
export interface IMedicalRecordStats {
  totalVisits: number; // Para mostrar fidelidade
  weightTrend: "stable" | "up" | "down"; // Seta visual ao lado do peso
  nextVaccineDate?: string; // Para o card de "Próximo Vencimento"
  lastVisitDate?: string; // "Visto há 3 meses"
  ageString?: string; // "2 anos e 3 meses" (já calculado pelo back ou front)
}
