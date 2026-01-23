export interface IPrescriptionItem {
  id: string;
  prescriptionId: string;
  medicationName: string;
  dosage: string;
  quantity?: string;
  duration?: string;
}

export interface ICreatePrescriptionItem {
  medicationName: string;
  dosage: string;
  quantity?: string;
  duration?: string;
}

export type IUpdatePrescriptionItem = Partial<ICreatePrescriptionItem>;
