import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";

export interface IMenuConfig {
  pages: {
    label: string;
    path: string;
    icon: string;
  }[];
}

@Component({
  selector: "app-layout-sidebar",
  imports: [RouterLink, VIconComponent],
  templateUrl: "./layout-sidebar.component.html"
})
export class LayoutSidebarComponent {
  isOpen = input.required<boolean>();
  menu = input.required<IMenuConfig>();

  closeSidebar = output<void>();

  onClose() {
    this.closeSidebar.emit();
  }
}
