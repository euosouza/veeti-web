export interface IAttachment {
  id: string;
  petId: string;
  medicalRecordId?: string;

  fileName: string;
  fileUrl: string;
  mimeType: string;
  sizeBytes?: number;
  description?: string;

  createdAt: string;
}

export interface ICreateAttachment {
  petId: string;
  medicalRecordId?: string;

  fileName: string;
  fileUrl: string;
  mimeType: string;
  sizeBytes?: number;
  description?: string;
}

// Updating attachment usually only description or metadata, not the file itself (usually re-upload)
export type IUpdateAttachment = Partial<Pick<ICreateAttachment, "description">>;
