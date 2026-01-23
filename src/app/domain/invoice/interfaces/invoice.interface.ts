import { PaymentStatus } from "../enums/payment-status.enum";

export interface IInvoice {
  id: string;
  quoteId?: string;
  tutorId: string;
  appointmentId?: string;

  totalAmount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  paidAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateInvoice {
  quoteId?: string;
  tutorId: string;
  appointmentId?: string;
  totalAmount: number;
  status?: PaymentStatus;
  paymentMethod?: string;
}

export type IUpdateInvoice = Partial<Omit<ICreateInvoice, "tutorId">> & { paidAt?: string };
