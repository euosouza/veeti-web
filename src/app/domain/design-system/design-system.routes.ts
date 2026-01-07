import { Routes } from "@angular/router";

export const routesDesignSystem: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.page").then((m) => m.HomePage)
  },
  {
    path: "fundamentos/tipografia",
    loadComponent: () => import("./pages/fundamentals/typography/typography.page").then((m) => m.TypographyPage)
  },
  {
    path: "fundamentos/cores",
    loadComponent: () => import("./pages/fundamentals/colors/colors.page").then((m) => m.ColorsPage)
  },
  {
    path: "fundamentos/icones",
    loadComponent: () => import("./pages/fundamentals/icons/icons.page").then((m) => m.IconsPage)
  },
  {
    path: "componentes/button",
    loadComponent: () => import("./pages/components/button-demo/button-demo.page").then((m) => m.ButtonDemoPage)
  },
  {
    path: "componentes/badge",
    loadComponent: () => import("./pages/components/badge-demo/badge-demo.page").then((m) => m.BadgeDemoPage)
  },
  {
    path: "componentes/skeleton",
    loadComponent: () => import("./pages/components/skeleton-demo/skeleton-demo.page").then((m) => m.SkeletonDemoPage)
  }
];
