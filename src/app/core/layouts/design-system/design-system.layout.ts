import { Component, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ButtonComponent } from "../../../libs/ui/components/button/button.component";
import { VIconComponent } from "../../../libs/ui/components/icon/v-icon.component";
import { VInputDirective } from "../../../libs/ui/components/input/v-input.directive";
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
  imports: [RouterOutlet, RouterLink, ButtonComponent, VInputDirective, VIconComponent],
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
        label: "Avatar",
        path: "/design-system/componentes/avatar"
      },
      {
        label: "Badge",
        path: "/design-system/componentes/badge"
      },
      {
        label: "Button",
        path: "/design-system/componentes/button"
      },
      {
        label: "Card",
        path: "/design-system/componentes/card"
      },
      {
        label: "Checkbox",
        path: "/design-system/componentes/checkbox"
      },
      {
        label: "Divider",
        path: "/design-system/componentes/divider"
      },
      {
        label: "Icon",
        path: "/design-system/componentes/icon"
      },
      {
        label: "Input",
        path: "/design-system/componentes/input"
      },
      {
        label: "Label",
        path: "/design-system/componentes/label"
      },
      {
        label: "Loading",
        path: "/design-system/componentes/loading"
      },
      {
        label: "Pagination",
        path: "/design-system/componentes/pagination"
      },
      {
        label: "Radio Group",
        path: "/design-system/componentes/radio-group"
      },
      {
        label: "Skeleton",
        path: "/design-system/componentes/skeleton"
      },
      {
        label: "Table",
        path: "/design-system/componentes/table"
      },
      {
        label: "Tabs",
        path: "/design-system/componentes/tabs"
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
