import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";

export interface IMenuItem {
  label: string;
  path?: string;
  icon?: string;
  children?: IMenuItem[];
  expanded?: boolean; // For local state usage if needed, or we handle it in component
}

export interface IMenuSection {
  label?: string; // Optional section header
  items: IMenuItem[];
}

export interface IMenuConfig {
  sections: IMenuSection[];
}

@Component({
  selector: "app-layout-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, VIconComponent, ButtonComponent],
  templateUrl: "./layout-sidebar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("submenu", [
      state(
        "hidden",
        style({
          height: "0",
          opacity: "0",
          overflow: "hidden"
        })
      ),
      state(
        "visible",
        style({
          height: "*",
          opacity: "1"
        })
      ),
      transition("hidden <=> visible", [animate("200ms ease-in-out")])
    ])
  ]
})
export class LayoutSidebarComponent {
  isOpen = input.required<boolean>(); // For mobile drawer
  isCollapsed = input<boolean>(false); // For desktop mini-sidebar
  menu = input.required<IMenuConfig>();

  closeSidebar = output<void>();
  toggleSidebar = output<void>();

  // Track expanded state of submenus. Key is the label or path.
  expandedItems = signal<Set<string>>(new Set());

  onClose() {
    this.closeSidebar.emit();
  }

  onToggle() {
    this.toggleSidebar.emit();
  }

  toggleSubmenu(item: IMenuItem) {
    if (this.isCollapsed()) return; // Don't expand in collapsed mode

    const current = this.expandedItems();
    const newSet = new Set(current);
    if (newSet.has(item.label)) {
      newSet.delete(item.label);
    } else {
      newSet.add(item.label);
    }
    this.expandedItems.set(newSet);
  }

  isExpanded(item: IMenuItem): boolean {
    return this.expandedItems().has(item.label);
  }
}
