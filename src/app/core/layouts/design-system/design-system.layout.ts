import { Component, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ButtonComponent } from "../../../libs/ui/components/button/button.component";
import { ThemeService } from "../../services/theme/theme.service";

interface Menu {
  fundamentos: {
    label: string;
    path: string;
  }[];
  componentes?: {
    label: string;
    path: string;
  }[];
}

@Component({
  selector: "app-design-system",
  imports: [RouterOutlet, RouterLink, ButtonComponent],
  templateUrl: "./design-system.layout.html"
})
export class DesignSystemLayout {
  private readonly themeService = inject(ThemeService);
  // Signal para controlar a abertura do menu mobile
  isSidebarOpen = signal(false);

  menu: Menu = {
    fundamentos: [
      {
        label: "Tipografia",
        path: "/design-system/fundamentos/tipografia"
      },
      {
        label: "Paleta de Cores",
        path: "/design-system/fundamentos/cores"
      },
      {
        label: "Ícones",
        path: "/design-system/fundamentos/icones"
      }
    ],
    componentes: [
      {
        label: "Button",
        path: "/design-system/componentes/button"
      },
      {
        label: "Badge",
        path: "/design-system/componentes/badge"
      },
      {
        label: "Skeleton",
        path: "/design-system/componentes/skeleton"
      }
    ]
  };

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  constructor() {
    this.themeService.load();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
