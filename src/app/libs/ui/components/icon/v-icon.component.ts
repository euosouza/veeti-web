import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "v-icon",
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="material-symbols-rounded select-none" [style.font-size]="fontSize()" aria-hidden="true">
      {{ name() }}
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
    `
  ],
  host: {
    "[style.height]": "fontSize()",
    "[style.width]": "fontSize()"
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIconComponent {
  readonly name = input.required<string>();
  readonly size = input<"sm" | "md" | "lg" | number>("md");

  readonly fontSize = computed(() => {
    const size = this.size();
    if (typeof size === "number") {
      return `${size}px`;
    }

    switch (size) {
      case "sm":
        return "16px";
      case "lg":
        return "24px";
      case "md":
      default:
        return "20px";
    }
  });
}
