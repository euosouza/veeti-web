import { ReminderType } from "../enums/reminder-type.enum";

export interface IReminder {
  id: string;
  tutorId: string;
  petId?: string;

  title: string;
  message?: string;
  type: ReminderType;
  channel: string; // 'WHATSAPP' default

  dueDate: string; // ISO Date Time
  sentAt?: string;

  createdAt: string;
}

export interface ICreateReminder {
  tutorId: string;
  petId?: string;
  title: string;
  message?: string;
  type: ReminderType;
  channel?: string;
  dueDate: string;
}

export type IUpdateReminder = Partial<Omit<ICreateReminder, "tutorId" | "petId">>;
