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
    path: "componentes/breadcrumb",
    title: "Breadcrumb",
    loadComponent: () => import("./pages/components/breadcrumb-demo/breadcrumb-demo.page").then((m) => m.BreadcrumbDemoPage)
  },
  {
    path: "componentes/skeleton",
    loadComponent: () => import("./pages/components/skeleton-demo/skeleton-demo.page").then((m) => m.SkeletonDemoPage)
  },
  {
    path: "componentes/input",
    loadComponent: () => import("./pages/components/input-demo/input-demo.page").then((m) => m.InputDemoPage)
  },
  {
    path: "componentes/icon",
    loadComponent: () => import("./pages/components/icon-demo/icon-demo.page").then((m) => m.IconDemoPage)
  },
  {
    path: "componentes/checkbox",
    title: "Checkbox",
    loadComponent: () => import("./pages/components/checkbox-demo/checkbox-demo.page").then((m) => m.CheckboxDemoPage)
  },
  {
    path: "componentes/label",
    title: "Label",
    loadComponent: () => import("./pages/components/label-demo/label-demo.page").then((m) => m.LabelDemoPage)
  },
  {
    path: "componentes/divider",
    title: "Divider",
    loadComponent: () => import("./pages/components/divider-demo/divider-demo.page").then((m) => m.DividerDemoPage)
  },
  {
    path: "componentes/card",
    title: "Card",
    loadComponent: () => import("./pages/components/card-demo/card-demo.page").then((m) => m.CardDemoPage)
  },
  {
    path: "componentes/alert",
    title: "Alert",
    loadComponent: () => import("./pages/components/alert-demo/alert-demo.page").then((m) => m.AlertDemoPage)
  },
  {
    path: "componentes/avatar",
    title: "Avatar",
    loadComponent: () => import("./pages/components/avatar-demo/avatar-demo.page").then((m) => m.AvatarDemoPage)
  },
  {
    path: "componentes/table",
    title: "Table",
    loadComponent: () => import("./pages/components/table-demo/table-demo.page").then((m) => m.TableDemoPage)
  },
  {
    path: "componentes/tabs",
    title: "Tabs",
    loadComponent: () => import("./pages/components/tabs-demo/tabs-demo.page").then((m) => m.TabsDemoPage)
  },
  {
    path: "componentes/pagination",
    title: "Pagination",
    loadComponent: () => import("./pages/components/pagination-demo/pagination-demo.page").then((m) => m.PaginationDemoPage)
  },
  {
    path: "componentes/radio-group",
    title: "Radio Group",
    loadComponent: () => import("./pages/components/radio-group-demo/radio-group-demo.page").then((m) => m.RadioGroupDemoPage)
  },
  {
    path: "componentes/loading",
    title: "Loading",
    loadComponent: () => import("./pages/components/loading-demo/loading-demo.page").then((m) => m.LoadingDemoPage)
  }
];
