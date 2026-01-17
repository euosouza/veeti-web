import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { mergeClasses } from "../../utils/merge-class";
import { vLabelVariants, type VLabelVariants } from "./v-label.constants";

@Component({
  selector: "v-label",
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [class]="computedClass()" [attr.for]="htmlFor()">
      <ng-content />
    </label>
  `,
  styles: []
})
export class VLabelComponent {
  readonly htmlFor = input<string>();
  readonly variant = input<VLabelVariants["variant"]>("default");
  readonly class = input<string>("");

  protected computedClass = computed(() => mergeClasses(vLabelVariants({ variant: this.variant() }), this.class()));
}
