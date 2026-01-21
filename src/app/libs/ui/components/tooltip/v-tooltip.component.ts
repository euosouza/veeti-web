import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { twMerge } from "tailwind-merge";
import { tooltipPositionVariants, tooltipVariants } from "./v-tooltip.constants";

@Component({
  selector: "v-tooltip",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass()" [attr.data-side]="side()">
      {{ text() }}
      <div [class]="arrowClass()"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VTooltipComponent {
  readonly text = input.required<string>();
  readonly side = input<"top" | "bottom" | "left" | "right">("top");
  readonly class = input<string>("");

  protected computedClass = computed(() => {
    return twMerge(tooltipVariants(), this.class());
  });

  protected arrowClass = computed(() => {
    return twMerge(tooltipPositionVariants({ position: this.side() }));
  });
}
