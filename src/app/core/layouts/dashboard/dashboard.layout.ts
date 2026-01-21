import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutContentComponent } from "@core/components/content/layout-content.component";
import { LayoutHeaderComponent } from "@core/components/header/layout-header.component";
import { LayoutSidebarComponent, IMenuConfig } from "@core/components/sidebar/layout-sidebar.component";
import { ThemeService } from "@core/services/theme/theme.service";

@Component({
  selector: "app-dashboard-layout",
  imports: [RouterOutlet, LayoutSidebarComponent, LayoutHeaderComponent, LayoutContentComponent],
  templateUrl: "./dashboard.layout.html"
})
export class DashboardLayout {
  private readonly themeService = inject(ThemeService);
  isSidebarOpen = signal(false);

  menu: IMenuConfig = {
    pages: [
      {
        label: "Tutores",
        path: "/app/tutores",
        icon: "group"
      }
    ]
  };

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  notification() {
    console.log("notification");
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
