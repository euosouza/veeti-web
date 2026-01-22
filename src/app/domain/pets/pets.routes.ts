import { Routes } from "@angular/router";

export const routesPets: Routes = [
  {
    path: "pets",
    loadComponent: () => import("./pages/list-pets/list-pets.page").then((m) => m.ListPetsPage)
  },
  {
    path: "pets/novo",
    loadComponent: () => import("./pages/form-pet/form-pet.page").then((m) => m.PetFormPage)
  },
  {
    path: "pets/editar/:id",
    loadComponent: () => import("./pages/form-pet/form-pet.page").then((m) => m.PetFormPage)
  },
  {
    path: "pets/:id",
    loadComponent: () => import("./pages/pet-details/pet-details.page").then((m) => m.PetDetailsPage)
  }
];
