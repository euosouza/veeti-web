import { CommonModule } from "@angular/common";
import { Component, computed, input, ViewEncapsulation } from "@angular/core";
import { RouterLink } from "@angular/router";
import { VIconComponent } from "../icon/v-icon.component";

export interface VBreadcrumbLink {
  label: string;
  path?: string;
  icon?: string;
}

export interface VBreadcrumbConfig {
  separator?: "arrow" | "slash";
  items: VBreadcrumbLink[];
}

@Component({
  selector: "v-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterLink, VIconComponent],
  template: `
    <nav aria-label="Breadcrumb">
      <ol
        class="flex items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5"
        [class.flex-wrap]="wrap() === 'wrap'"
        [class.justify-center]="align() === 'center'"
        [class.justify-end]="align() === 'end'"
        [class.justify-between]="align() === 'between'"
      >
        @for (item of config().items; track $index; let last = $last) {
          <li class="inline-flex items-center gap-1.5">
            @if (item.path && !last) {
              <a [routerLink]="item.path" class="transition-colors hover:text-foreground flex items-center gap-1.5">
                @if (item.icon) {
                  <v-icon [name]="item.icon" [size]="14" />
                }
                {{ item.label }}
              </a>
            } @else {
              <span class="flex items-center gap-1.5" [class.text-foreground]="last">
                @if (item.icon) {
                  <v-icon [name]="item.icon" [size]="14" />
                }
                {{ item.label }}
              </span>
            }
          </li>

          @if (!last) {
            <li aria-hidden="true" class="[&>svg]:size-3.5 text-muted-foreground/50">
              @switch (separatorType()) {
                @case ("arrow") {
                  <v-icon name="keyboard_arrow_right" [size]="14" />
                }
                @case ("slash") {
                  <span class="text-xs">/</span>
                }
                @default {
                  <v-icon name="keyboard_arrow_right" [size]="14" />
                }
              }
            </li>
          }
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class VBreadcrumbComponent {
  readonly config = input.required<VBreadcrumbConfig>();
  readonly wrap = input<"wrap" | "nowrap">("wrap");
  readonly align = input<"start" | "center" | "end" | "between">("start");

  readonly separatorType = computed(() => this.config().separator || "arrow");
}
