import { IUser } from "../../user/interfaces/user.interface";

export interface IVeterinarian {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  crmv: string;
  crmvUf: string;
  specialty?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  // Relations
  user?: IUser;
}

export interface ICreateVeterinarian {
  userId: string;
  name: string;
  phone?: string;
  crmv: string;
  crmvUf: string;
  specialty?: string;
}

export type IUpdateVeterinarian = Partial<Omit<ICreateVeterinarian, "userId">>;
