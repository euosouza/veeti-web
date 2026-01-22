import { ClinicalStatus, PetGender, PetSpecies } from "@core/enums/pet-domain.enums";
import { ITutor } from "@domain/tutor/interfaces/tutor.interface";

export interface IPetMemory {
  id: string;
  date: string; // ISO Date
  title: string;
  description?: string;
  photoUrl?: string;
}

// Interface Principal (Leitura)
export interface IPet {
  id: string;
  tutorId: string; // Vínculo obrigatório
  name: string;
  species: PetSpecies;
  breed: string; // Raça
  gender: PetGender;
  birthDate?: string; // ISO Date (opcional, pois nem sempre se sabe a data exata)
  weightKg?: number; // Peso atual
  clinicalStatus: ClinicalStatus;
  notes?: string; // Observações gerais/Memórias
  photoUrl?: string; // URL da foto (futuro upload)
  memories?: IPetMemory[];
  createdAt: string;
  updatedAt: string;
  tutor?: ITutor;
}

// Payload de Criação
export interface ICreatePet {
  tutorId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  birthDate?: string;
  weightKg?: number;
  clinicalStatus: ClinicalStatus;
  notes?: string;
  photoUrl?: string;
}

// Payload de Edição
export type IUpdatePet = Partial<Omit<ICreatePet, "tutorId">>;
