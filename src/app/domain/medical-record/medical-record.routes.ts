import { Routes } from "@angular/router";

export const routesMedicalRecord: Routes = [
  {
    path: "medical-record/:id",
    loadComponent: () => import("./pages/medical-record/medical-record.page").then((m) => m.MedicalRecordPage)
  }
];
