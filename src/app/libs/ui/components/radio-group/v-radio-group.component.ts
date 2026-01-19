import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, DestroyRef, forwardRef, inject, Injector, input, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { RADIO_GROUP_TOKEN, radioGroupVariants, type RadioButtonVariants } from "./v-radio.constants";

type OnTouchedType = () => void;
type OnChangeType = (value: unknown) => void;

@Component({
  selector: "v-radio-group",
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VRadioGroupComponent),
      multi: true
    },
    {
      provide: RADIO_GROUP_TOKEN,
      useExisting: forwardRef(() => VRadioGroupComponent)
    }
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "radiogroup",
    "[class]": "computedClass()",
    "(focusout)": "onBlur()",
    class: "w-full"
  }
})
export class VRadioGroupComponent implements ControlValueAccessor, OnInit {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  private ngControl: NgControl | null = null;

  // Inputs
  readonly class = input<string>("");
  readonly size = input<RadioButtonVariants["size"]>("md");
  readonly variant = input<string>("default");

  readonly disabled = input<boolean>(false);

  // States
  readonly value = signal<unknown>(null);
  readonly hasError = signal(false);
  private readonly _cvaDisabled = signal(false);
  readonly id = input<string>("");

  readonly inputId = computed(() => this.id() || `v-radio-group-${Math.random().toString(36).substr(2, 9)}`);

  readonly isDisabled = computed(() => this.disabled() || this._cvaDisabled());

  readonly computedVariant = computed(() => (this.hasError() || this.variant() === "error" ? "error" : "default"));

  // Methods for ControlValueAccessor
  private onTouched: OnTouchedType = () => void 0;
  private onChangeFn: OnChangeType = () => void 0;

  readonly computedClass = computed(() => {
    return `${radioGroupVariants()} ${this.class()}`;
  });

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl, null, {
        optional: true,
        self: true
      });
    } catch (e) {
      console.warn("VRadioGroupComponent: Could not resolve NgControl", e);
    }

    if (this.ngControl) {
      this.ngControl.statusChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateErrorState();
      });

      this.ngControl.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateErrorState();
      });

      this.updateErrorState();
    }
  }

  // --- ControlValueAccessor Implementation ---

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }

  // --- Public API for child components ---

  selectValue(value: unknown) {
    if (this.isDisabled()) return;
    this.value.set(value);
    this.onChangeFn(value);
    this.onTouched();
    this.updateErrorState();
  }

  onBlur() {
    this.onTouched();
    this.updateErrorState();
  }

  private updateErrorState() {
    if (!this.ngControl) return;
    const isError = !!this.ngControl.invalid && (!!this.ngControl.touched || !!this.ngControl.dirty);
    this.hasError.set(isError);
  }
}
