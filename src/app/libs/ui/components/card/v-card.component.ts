import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { type ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { cardContentVariants, cardFooterVariants, cardHeaderVariants, cardVariants } from "./v-card.constants";

@Component({
  selector: "v-card",
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @if (vTitle()) {
      <div [class]="headerClasses()" data-slot="card-header">
        <div class="text-foreground leading-none font-semibold" data-slot="card-title">
          @if (isTemplate(vTitle())) {
            <ng-container *ngTemplateOutlet="$any(vTitle())"></ng-container>
          } @else {
            {{ vTitle() }}
          }
        </div>

        @if (vDescription()) {
          <div class="text-muted-foreground text-sm" data-slot="card-description">
            @if (isTemplate(vDescription())) {
              <ng-container *ngTemplateOutlet="$any(vDescription())"></ng-container>
            } @else {
              {{ vDescription() }}
            }
          </div>
        }
      </div>
    }

    <div [class]="contentClasses()" data-slot="card-content">
      <ng-content></ng-content>
    </div>

    <div [class]="footerClasses()" data-slot="card-footer">
      <ng-content select="[v-card-footer]"></ng-content>
    </div>
  `,
  styles: `
    [data-slot="card-footer"]:empty {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "data-slot": "card",
    "[class]": "classes()"
  }
})
export class VCardComponent {
  readonly class = input<ClassValue>("");
  readonly vFooterBorder = input(false);
  readonly vHeaderBorder = input(false);
  readonly size = input<"sm" | "md" | "lg">("md");

  // Content inputs
  readonly vTitle = input<string | TemplateRef<void>>();
  readonly vDescription = input<string | TemplateRef<void>>();

  // Computed classes
  protected readonly classes = computed(() => mergeClasses(cardVariants({ size: this.size() }), this.class()));

  protected readonly headerClasses = computed(() => mergeClasses(cardHeaderVariants({ size: this.size() }), this.vHeaderBorder() ? "border-b" : ""));

  protected readonly contentClasses = computed(() => mergeClasses(cardContentVariants({ size: this.size() }), this.class()));

  protected readonly footerClasses = computed(() => mergeClasses(cardFooterVariants({ size: this.size() }), this.vFooterBorder() ? "border-t" : ""));

  protected isTemplate(value: unknown): boolean {
    return value instanceof TemplateRef;
  }
}
