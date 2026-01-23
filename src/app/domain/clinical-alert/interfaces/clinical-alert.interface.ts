import { AlertSeverity } from "../enums/alert-severity.enum";

export interface IClinicalAlert {
  id: string;
  petId: string;
  type: string; // ALLERGY, BEHAVIOR, CHRONIC - could be another enum
  description: string;
  severity: AlertSeverity;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateClinicalAlert {
  petId: string;
  type: string;
  description: string;
  severity: AlertSeverity;
  isActive?: boolean;
}

export type IUpdateClinicalAlert = Partial<Omit<ICreateClinicalAlert, "petId">>;
