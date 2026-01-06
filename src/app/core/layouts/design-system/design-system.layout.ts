import { Component, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

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
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./design-system.layout.html"
})
export class DesignSystemLayout {
  // Signal para controlar a abertura do menu mobile
  isSidebarOpen = signal(false);

  menu: Menu = {
    fundamentos: [
      {
        label: "Tipografia",
        path: "/design-system/tipografia"
      },
      {
        label: "Paleta de Cores",
        path: "/design-system/cores"
      },
      {
        label: "Ícones",
        path: "/design-system/icones"
      }
    ]
  };

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
