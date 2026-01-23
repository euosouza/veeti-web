export interface IQuoteItem {
  id: string;
  quoteId: string;
  serviceId?: string; // Optional if it's a custom item
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ICreateQuoteItem {
  serviceId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
