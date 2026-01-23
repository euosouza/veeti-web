export interface IServiceCatalog {
  id: string;
  veterinarianId: string;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  createdAt: string;
}

export interface ICreateServiceCatalog {
  veterinarianId: string;
  name: string;
  description?: string;
  price: number;
  active?: boolean;
}

export type IUpdateServiceCatalog = Partial<Omit<ICreateServiceCatalog, "veterinarianId">>;
