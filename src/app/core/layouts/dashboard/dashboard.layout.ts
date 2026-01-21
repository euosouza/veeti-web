import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterOutlet } from "@angular/router";
import { LayoutContentComponent } from "@core/components/content/layout-content.component";
import { LayoutHeaderComponent } from "@core/components/header/layout-header.component";
import { IMenuConfig, LayoutSidebarComponent } from "@core/components/sidebar/layout-sidebar.component";
import { ThemeService } from "@core/services/theme/theme.service";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard-layout",
  imports: [RouterOutlet, LayoutSidebarComponent, LayoutHeaderComponent, LayoutContentComponent, VIconComponent, ButtonComponent],
  templateUrl: "./dashboard.layout.html"
})
export class DashboardLayout {
  private readonly themeService = inject(ThemeService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  isSidebarOpen = signal(false); // Menu mobile (gaveta)
  isSidebarCollapsed = signal(false); // Estado colapsado no desktop

  // Monitora se a tela é desktop (breakpoint lg)
  isDesktop = toSignal(this.breakpointObserver.observe("(min-width: 1024px)").pipe(map((result) => result.matches)), { initialValue: true });

  // Estado de colapso efetivo: falso se for mobile, caso contrário segue isSidebarCollapsed
  effectiveIsCollapsed = computed(() => {
    return this.isDesktop() && this.isSidebarCollapsed();
  });

  constructor() {
    effect(() => {
      // Se mudarmos para mobile (isDesktop torna-se falso), garante que o menu lateral seja fechado
      if (!this.isDesktop()) {
        this.isSidebarOpen.set(false);
      }
    });
  }

  menu: IMenuConfig = {
    sections: [
      {
        items: [
          {
            label: "Tutores",
            path: "/app/tutores",
            icon: "group"
          }
        ]
      }
    ]
  };

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  toggleCollapse() {
    this.isSidebarCollapsed.update((val) => !val);
  }

  notification() {
    console.log("notification");
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
