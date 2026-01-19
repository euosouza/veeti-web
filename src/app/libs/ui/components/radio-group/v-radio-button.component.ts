import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { mergeClasses } from "../../utils/merge-class";
import { RADIO_GROUP_TOKEN, radioButtonVariants, radioCircleVariants, radioDotVariants, type RadioButtonVariants } from "./v-radio.constants";

@Component({
  selector: "v-radio-button",
  imports: [CommonModule],
  template: `
    <input type="radio" class="sr-only" [checked]="isSelected()" [disabled]="isDisabled()" [attr.name]="radioGroup.inputId()" />
    <div [class]="circleClasses()">
      @if (isSelected()) {
        <div [class]="dotClasses()"></div>
      }
    </div>
    <span class="cursor-pointer select-none">
      <ng-content></ng-content>
    </span>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "radio",
    "[attr.aria-checked]": "isSelected()",
    "[attr.aria-disabled]": "isDisabled()",
    "[class]": "containerClasses()",
    "[tabindex]": "isDisabled() ? -1 : 0",
    "(click)": "select()",
    "(keydown.space)": "select()",
    "(keydown.enter)": "select()",
    class: "relative w-full"
  }
})
export class VRadioButtonComponent {
  protected readonly radioGroup = inject(RADIO_GROUP_TOKEN);

  readonly value = input.required<unknown>();
  readonly id = input<string>(`v-radio-${Math.random().toString(36).substr(2, 9)}`);
  readonly class = input<string>("");

  readonly isSelected = computed(() => this.radioGroup.value() === this.value());
  readonly isDisabled = computed(() => this.radioGroup.isDisabled() || false);
  readonly variant = computed(() => this.radioGroup.computedVariant());
  readonly size = computed(() => this.radioGroup.size());

  readonly containerClasses = computed(() => {
    return mergeClasses(
      radioButtonVariants({
        variant: this.variant() as RadioButtonVariants["variant"],
        size: this.size() as RadioButtonVariants["size"],
        disabled: this.isDisabled()
      }),
      this.class()
    );
  });

  readonly circleClasses = computed(() => {
    return mergeClasses(
      "flex items-center justify-center",
      radioCircleVariants({
        variant: this.variant() as RadioButtonVariants["variant"],
        size: this.size() as RadioButtonVariants["size"],
        disabled: this.isDisabled()
      })
    );
  });

  readonly dotClasses = computed(() => {
    return radioDotVariants({
      size: this.size() as RadioButtonVariants["size"]
    });
  });

  select() {
    if (!this.isDisabled()) {
      this.radioGroup.selectValue(this.value());
    }
  }
}
