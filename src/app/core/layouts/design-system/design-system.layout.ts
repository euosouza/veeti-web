import { Component, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-design-system",
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./design-system.layout.html"
})
export class DesignSystemLayout {
  // Signal para controlar a abertura do menu mobile
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
