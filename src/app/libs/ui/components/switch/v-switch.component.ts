import { Component, computed, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { twMerge } from "tailwind-merge";
import { switchThumbVariants, switchVariants, SwitchVariants } from "./v-switch.constants";

@Component({
  selector: "v-switch",
  standalone: true,
  template: `
    <button
      [id]="id"
      type="button"
      role="switch"
      [attr.aria-checked]="isChecked()"
      [attr.data-state]="isChecked() ? 'checked' : 'unchecked'"
      [attr.disabled]="computedDisabled() ? '' : null"
      [class]="computedClass()"
      (click)="toggle()"
      (keydown)="onKeyDown($event)"
    >
      <span [class]="computedThumbClass()" [attr.data-state]="isChecked() ? 'checked' : 'unchecked'"></span>
    </button>
    @if (label()) {
      <label [for]="id" class="ml-2 text-sm font-medium leading-none cursor-pointer">{{ label() }}</label>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VSwitchComponent),
      multi: true
    }
  ]
})
export class VSwitchComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly disabled = input<boolean>(false);
  readonly variant = input<SwitchVariants["variant"]>("default");
  readonly size = input<SwitchVariants["size"]>("md");
  readonly class = input<string>("");

  protected readonly _formDisabled = signal(false);
  protected readonly isChecked = signal(false);
  protected readonly id = `v-switch-${Math.random().toString(36).substr(2, 9)}`;

  protected computedDisabled = computed(() => this.disabled() || this._formDisabled());

  protected computedClass = computed(() => {
    return twMerge(switchVariants({ variant: this.variant(), size: this.size() }), this.class());
  });

  protected computedThumbClass = computed(() => {
    return switchThumbVariants({ size: this.size() });
  });

  // ControlValueAccessor methods
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  toggle() {
    if (this.computedDisabled()) return;
    this.isChecked.update((v) => !v);
    this.onChange(this.isChecked());
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.computedDisabled()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggle();
    }
  }

  writeValue(value: boolean): void {
    this.isChecked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }
}
