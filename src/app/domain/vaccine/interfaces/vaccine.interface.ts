export interface IVaccine {
  id: string;
  petId: string;
  veterinarianId?: string;

  name: string;
  batch?: string; // Lote
  manufacturer?: string; // Fabricante
  applicationDate: string; // ISO Date
  nextDueDate?: string; // Data do reforço

  createdAt: string;
}

export interface ICreateVaccine {
  petId: string;
  veterinarianId?: string;
  name: string;
  batch?: string;
  manufacturer?: string;
  applicationDate: string;
  nextDueDate?: string;
}

export type IUpdateVaccine = Partial<Omit<ICreateVaccine, "petId">>;
