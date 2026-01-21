import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { type ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { progressIndicatorVariants, progressVariants } from "./v-progress.constants";

@Component({
  selector: "v-progress",
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="h-full w-full flex-1 transition-all" [class]="indicatorClasses()" [ngStyle]="indicatorStyles()"></div> `,
  host: {
    role: "progressbar",
    "[attr.aria-valuemin]": "0",
    "[attr.aria-valuemax]": "max()",
    "[attr.aria-valuenow]": "value()",
    "[class]": "containerClasses()"
  },
  styles: `
    v-progress {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VProgressComponent {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly size = input<"sm" | "md" | "lg" | "xl">("md");
  readonly variant = input<"default" | "success" | "destructive" | "warning" | "info" | "custom">("default");
  readonly color = input<string>();
  readonly class = input<ClassValue>("");

  protected readonly percentage = computed(() => {
    const value = this.value();
    const max = this.max();

    if (max === 0) return 0;
    return Math.min(Math.max((value / max) * 100, 0), 100);
  });

  protected readonly containerClasses = computed(() => mergeClasses(progressVariants({ size: this.size() }), this.class()));

  protected readonly indicatorClasses = computed(() => progressIndicatorVariants({ variant: this.variant() }));

  protected readonly indicatorStyles = computed(() => {
    const styles: Record<string, string> = {
      transform: `translateX(-${100 - (this.percentage() || 0)}%)`
    };

    if (this.variant() === "custom" && this.color()) {
      styles["background-color"] = this.color()!;
    }

    return styles;
  });
}
