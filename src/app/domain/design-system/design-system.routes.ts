import { Routes } from "@angular/router";

export const routesDesignSystem: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.page").then((m) => m.HomePage)
  },
  {
    path: "tipografia",
    loadComponent: () => import("./pages/typography/typography.page").then((m) => m.TypographyPage)
  }
];
