export interface IMedicalRecord {
  id: string;
  appointmentId?: string;
  petId: string;
  veterinarianId: string;
  date: string;
  complaint?: string; // Queixa principal
  history?: string; // Anamnese
  physicalExam?: string; // Exame físico
  diagnosis?: string;
  treatment?: string;
  weightAtExam?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ICreateMedicalRecord {
  appointmentId?: string;
  petId: string;
  veterinarianId: string;
  date: string;
  complaint?: string;
  history?: string;
  physicalExam?: string;
  diagnosis?: string;
  treatment?: string;
  weightAtExam?: number;
}

export type IUpdateMedicalRecord = Partial<Omit<ICreateMedicalRecord, "petId" | "veterinarianId">>;
