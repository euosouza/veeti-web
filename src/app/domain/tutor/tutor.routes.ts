import { Routes } from "@angular/router";

export const routesTutor: Routes = [
  {
    path: "tutores",
    loadComponent: () => import("./pages/list-tutors/list-tutors.page").then((m) => m.ListTutorsPage)
  },
  {
    path: "tutores/novo",
    loadComponent: () => import("./pages/form-tutor/form-tutor").then((m) => m.TutorFormPage)
  },
  {
    path: "tutores/editar/:id",
    loadComponent: () => import("./pages/form-tutor/form-tutor").then((m) => m.TutorFormPage)
  },
  {
    path: "tutores/consultar/:id",
    loadComponent: () => import("./pages/form-tutor/form-tutor").then((m) => m.TutorFormPage)
  }
];
