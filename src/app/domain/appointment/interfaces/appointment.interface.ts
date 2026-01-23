import { AppointmentStatus } from "../enums/appointment-status.enum";

export interface IAppointment {
  id: string;
  veterinarianId: string;
  petId: string;
  addressId?: string; // Optional (clinic/remote)

  date: string; // ISO Date/Time
  durationMinutes: number;
  status: AppointmentStatus;

  checkInAt?: string;
  checkOutAt?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ICreateAppointment {
  veterinarianId: string;
  petId: string;
  addressId?: string;
  date: string;
  durationMinutes?: number;
  status?: AppointmentStatus;
  notes?: string;
}

export type IUpdateAppointment = Partial<Omit<ICreateAppointment, "veterinarianId" | "petId">> & {
  checkInAt?: string;
  checkOutAt?: string;
};
