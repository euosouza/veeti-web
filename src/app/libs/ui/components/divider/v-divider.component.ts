import { Component, computed, input } from "@angular/core";
import { mergeClasses } from "../../utils/merge-class";
import { dividerVariants, type DividerVariants } from "./v-divider.constants";

@Component({
  selector: "v-divider",
  standalone: true,
  template: ` <div role="separator" [attr.aria-orientation]="direction() === 'horizontal' ? 'horizontal' : 'vertical'" [class]="computedClass()"></div> `
})
export class VDividerComponent {
  readonly direction = input<"horizontal" | "vertical">("horizontal");
  readonly variant = input<DividerVariants["variant"]>("default");
  readonly class = input<string>("");

  protected readonly computedClass = computed(() => mergeClasses(dividerVariants({ direction: this.direction(), variant: this.variant() }), this.class()));
}
