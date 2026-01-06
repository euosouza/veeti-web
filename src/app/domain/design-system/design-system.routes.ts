import { Routes } from "@angular/router";

export const routesDesignSystem: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.page").then((m) => m.HomePage)
  },
  {
    path: "tipografia",
    loadComponent: () => import("./pages/fundamentals/typography/typography.page").then((m) => m.TypographyPage)
  },
  {
    path: "cores",
    loadComponent: () => import("./pages/fundamentals/colors/colors.page").then((m) => m.ColorsPage)
  },
  {
    path: "icones",
    loadComponent: () => import("./pages/fundamentals/icons/icons.page").then((m) => m.IconsPage)
  }
];
