import { ICreatePrescriptionItem, IPrescriptionItem } from "./prescription-item.interface";

export interface IPrescription {
  id: string;
  appointmentId?: string;
  veterinarianId: string;
  petId: string;

  code?: string;
  notes?: string;
  issuedAt: string;

  items?: IPrescriptionItem[];
}

export interface ICreatePrescription {
  appointmentId?: string;
  veterinarianId: string;
  petId: string;
  notes?: string;
  items: ICreatePrescriptionItem[]; // Must have items usually
}

export type IUpdatePrescription = Partial<Omit<ICreatePrescription, "veterinarianId" | "petId">> & { items?: ICreatePrescriptionItem[] };
