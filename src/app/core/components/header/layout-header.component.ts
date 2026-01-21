import { Component, output } from "@angular/core";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VIconComponent } from "@libs/ui/components/icon/v-icon.component";
import { VInputGroupComponent } from "@libs/ui/components/input/v-input-group.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";

@Component({
  selector: "app-layout-header",
  imports: [ButtonComponent, VIconComponent, VInputDirective, VInputGroupComponent],
  templateUrl: "./layout-header.component.html"
})
export class LayoutHeaderComponent {
  toggleSidebar = output<void>();
  toggleTheme = output<void>();
  triggerNotification = output<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onNotification() {
    this.triggerNotification.emit();
  }
}
