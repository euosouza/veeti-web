import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { VBreadcrumbComponent } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";
import { VBreadcrumbConfig } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";

@Component({
  selector: "app-page-header",
  standalone: true,
  imports: [CommonModule, VBreadcrumbComponent],
  templateUrl: "./page-header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  breadcrumb = input.required<VBreadcrumbConfig>();
}
