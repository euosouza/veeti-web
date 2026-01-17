import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, output, signal, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { VIconComponent } from "../icon/v-icon.component";
import { checkboxVariants, type CheckboxVariants } from "./v-checkbox.constants";

type OnTouchedType = () => void;
type OnChangeType = (value: boolean) => void;

@Component({
  selector: "v-checkbox",
  standalone: true,
  imports: [CommonModule, VIconComponent],
  template: `
    <span
      tabindex="0"
      class="group flex items-center gap-2 outline-none"
      [class.cursor-not-allowed]="isDisabled()"
      [class.cursor-pointer]="!isDisabled()"
      [attr.aria-disabled]="isDisabled()"
      (click)="onContainerClick($event)"
      (keydown.enter.prevent)="onContainerClick($event)"
      (keydown.space.prevent)="onContainerClick($event)"
    >
      <div class="relative flex items-center justify-center">
        <input
          #inputRef
          type="checkbox"
          class=""
          [id]="inputId()"
          [class]="checkboxClass()"
          [checked]="checked()"
          [disabled]="isDisabled()"
          [attr.data-state]="checked() ? 'checked' : 'unchecked'"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
          tabindex="-1"
        />
        <v-icon
          name="check"
          class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-200"
          [class.opacity-100]="checked()"
          [class.opacity-0]="!checked()"
          [size]="iconSize()"
        />
      </div>
      <label
        [for]="inputId()"
        class="font-medium leading-none select-none text-foreground"
        [class.text-sm]="size() === 'sm' || size() === 'md'"
        [class.text-base]="size() === 'lg'"
        [class.cursor-pointer]="!isDisabled()"
        [class.cursor-not-allowed]="isDisabled()"
        [class.text-muted-foreground]="isDisabled()"
        [class.opacity-50]="isDisabled()"
      >
        <ng-content />
      </label>
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VCheckboxComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VCheckboxComponent implements ControlValueAccessor {
  readonly id = input<string>("");
  readonly variant = input<CheckboxVariants["variant"]>("default");
  readonly size = input<CheckboxVariants["size"]>("md");
  readonly class = input<string>("");
  readonly disabled = input<boolean>(false);

  readonly checkedChange = output<boolean>();

  // Estado interno para desabilitado via CVA
  private readonly _cvaDisabled = signal(false);

  readonly checked = signal(false);

  // Combina desabilitado via input e via CVA
  readonly isDisabled = computed(() => this.disabled() || this._cvaDisabled());

  // Gera um ID único se não fornecido
  readonly inputId = computed(() => this.id() || `v-checkbox-${Math.random().toString(36).substr(2, 9)}`);

  readonly checkboxClass = computed(() => {
    return `${checkboxVariants({ variant: this.variant(), size: this.size() })} ${this.class()}`;
  });

  readonly iconSize = computed(() => {
    switch (this.size()) {
      case "sm":
        return 18;
      case "lg":
        return 20;
      case "md":
      default:
        return 18;
    }
  });

  public onTouched: OnTouchedType = () => void 0;
  public onChangeFn: OnChangeType = () => void 0;

  onContainerClick(event: Event) {
    if (this.isDisabled()) return;

    const target = event.target as HTMLElement;
    // Permite cliques no input e label serem manipulados nativamente ou por seus próprios manipuladores
    if (target.tagName === "INPUT" || target.tagName === "LABEL") {
      return;
    }

    event.preventDefault();
    this.toggleState(!this.checked());
  }

  onInputChange(event: Event) {
    event.stopPropagation();
    const input = event.target as HTMLInputElement;
    this.updateState(input.checked);
  }

  private toggleState(newState: boolean) {
    this.updateState(newState);
  }

  private updateState(isChecked: boolean) {
    this.checked.set(isChecked);
    this.onChangeFn(isChecked);
    this.checkedChange.emit(isChecked);
  }

  // Métodos do ControlValueAccessor
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }
}
