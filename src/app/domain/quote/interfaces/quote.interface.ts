import { QuoteStatus } from "../enums/quote-status.enum";
import { ICreateQuoteItem, IQuoteItem } from "./quote-item.interface";

export interface IQuote {
  id: string;
  veterinarianId: string;
  tutorId: string;

  status: QuoteStatus;
  totalAmount: number;
  expirationDate?: string;
  publicToken?: string;

  items?: IQuoteItem[];

  createdAt: string;
  updatedAt: string;
}

export interface ICreateQuote {
  veterinarianId: string;
  tutorId: string;
  status?: QuoteStatus;
  expirationDate?: string;
  items: ICreateQuoteItem[];
}

export type IUpdateQuote = Partial<Omit<ICreateQuote, "veterinarianId" | "tutorId">> & { items?: ICreateQuoteItem[] };
