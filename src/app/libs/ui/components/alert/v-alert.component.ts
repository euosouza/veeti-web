import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { type ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { VIconComponent } from "../icon/v-icon.component";
import { alertDescriptionVariants, alertTitleVariants, alertVariants, type AlertVariants } from "./v-alert.constants";

@Component({
  selector: "v-alert",
  standalone: true,
  imports: [NgTemplateOutlet, VIconComponent],
  template: `
    @if (vIcon() || defaultIcon()) {
      <div [class]="iconClasses">
        @if (isTemplate(vIcon())) {
          <ng-container *ngTemplateOutlet="$any(vIcon())"></ng-container>
        } @else {
          <v-icon [name]="iconName()!" class="w-full h-full" />
        }
      </div>
    }

    <div class="flex-1">
      @if (vTitle()) {
        <h5 [class]="titleClasses()" class="text-sm font-semibold">
          @if (isTemplate(vTitle())) {
            <ng-container *ngTemplateOutlet="$any(vTitle())"></ng-container>
          } @else {
            {{ vTitle() }}
          }
        </h5>
      }

      @if (vDescription() || isContentProjected) {
        <div [class]="descriptionClasses()" class="text-sm">
          @if (vDescription()) {
            @if (isTemplate(vDescription())) {
              <ng-container *ngTemplateOutlet="$any(vDescription())"></ng-container>
            } @else {
              {{ vDescription() }}
            }
          }
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: "alert",
    "[class]": "classes()"
  }
})
export class VAlertComponent {
  readonly class = input<ClassValue>("");
  readonly variant = input<AlertVariants["variant"]>("default");

  readonly vTitle = input<string | TemplateRef<void>>();
  readonly vDescription = input<string | TemplateRef<void>>();
  readonly vIcon = input<string | TemplateRef<void>>();

  protected readonly classes = computed(() => mergeClasses(alertVariants({ variant: this.variant() }), this.class()));
  protected readonly titleClasses = computed(() => alertTitleVariants({ variant: this.variant() }));
  protected readonly descriptionClasses = computed(() => alertDescriptionVariants({ variant: this.variant() }));
  protected readonly iconClasses = "h-4 w-4"; // Icons within alert are typically fixed size

  protected readonly defaultIcon = computed(() => {
    switch (this.variant()) {
      case "destructive":
        return "error"; // Equivalent to circle-alert
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "success":
        return "check_circle";
      default:
        return null;
    }
  });
  // Computed to determine the icon name if string
  protected readonly iconName = computed(() => {
    const icon = this.vIcon();
    if (typeof icon === "string") {
      return icon;
    }
    return this.defaultIcon();
  });

  protected isTemplate(value: unknown): boolean {
    return value instanceof TemplateRef;
  }

  // Helper to check if we have content projection (approximation as we can't easily detect empty projection without wrapper)
  // For now we assume if description is null, we might rely on projection.
  // Actually, standard alert structure usually puts description in a div.
  readonly isContentProjected = true;
}
