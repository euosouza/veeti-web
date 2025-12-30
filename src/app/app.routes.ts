import { Routes } from "@angular/router";
import { routesDesignSystem } from "./domain/design-system/design-system.routes";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/design-system",
    pathMatch: "full"
  },
  // Rotas para telas do design system
  {
    path: "design-system",
    loadComponent: () => import("./core/layouts/design-system/design-system.layout").then((m) => m.DesignSystemLayout),
    children: [...routesDesignSystem]
  }
  // Rotas para telas de login, cadastro e recuperação de senha
  // {
  //   path: "auth",
  //   loadComponent: () => import("./core/layouts/auth/auth").then((m) => m.AuthLayout),
  //   children: []
  // },
  // Rotas para telas logadas da aplicação
  // {
  //   path: "app",
  //   loadComponent: () => import("./core/layouts/dashbord/dashbord").then((m) => m.DashbordLayout),
  //   children: []
  // },
  // Rota para landing pages e site institucional
  // {
  //   path: "",
  //   loadComponent: () => import("./core/layouts/free/free").then((m) => m.FreeLayout),
  //   children: []
  // }
];
