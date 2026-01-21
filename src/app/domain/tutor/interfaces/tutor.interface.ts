import { ITutorAddress } from "./tutor-address.interface";

// Interface principal (Resposta da API)
export interface ITutor {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: ITutorAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para Payload de Criação (Substitui o antigo DTO class)
export interface ICreateTutor {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: ITutorAddress;
  notes?: string;
}

// Interface para Payload de Edição
export type IUpdateTutor = Partial<ICreateTutor>;
