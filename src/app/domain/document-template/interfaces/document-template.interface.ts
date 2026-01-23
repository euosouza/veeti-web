import { DocumentTemplateType } from "../enums/template-type.enum";

export interface IDocumentTemplate {
  id: string;
  veterinarianId: string;
  title: string;
  type: DocumentTemplateType;
  content: string; // HTML or Markdown
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ICreateDocumentTemplate {
  veterinarianId: string;
  title: string;
  type: DocumentTemplateType;
  content: string;
}

export type IUpdateDocumentTemplate = Partial<Omit<ICreateDocumentTemplate, "veterinarianId">>;
