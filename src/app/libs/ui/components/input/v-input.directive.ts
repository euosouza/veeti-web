/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, DestroyRef, Directive, ElementRef, forwardRef, inject, Injector, input, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import type { ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { vInputVariants, VInputVariants } from "./v-input.constants";

type OnTouchedType = () => void;
type OnChangeType = (value: string) => void;

@Directive({
  selector: "input[vInput], textarea[vInput]",
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VInputDirective),
      multi: true
    }
  ],
  host: {
    "[class]": "computedClass()",
    "(blur)": "onBlur()",
    "(input)": "onInput($event)"
  }
})
export class VInputDirective implements ControlValueAccessor, OnInit {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  public readonly elementRef = inject(ElementRef);

  private ngControl: NgControl | null = null;

  // Entradas
  readonly class = input<ClassValue>("");
  readonly variant = input<VInputVariants["variant"]>("default");
  readonly size = input<VInputVariants["size"]>("default");

  // Estado
  protected readonly hasError = signal(false);
  protected readonly isDisabled = signal(false);

  // Métodos do ControlValueAccessor
  private onTouched: OnTouchedType = () => void 0;
  private onChangeFn: OnChangeType = () => void 0;

  // Classe computada
  protected readonly computedClass = computed(() => {
    const statusVariant = this.hasError() ? "error" : this.variant();

    return mergeClasses(
      vInputVariants({
        variant: statusVariant,
        size: this.size()
      }),
      this.class()
    );
  });

  ngOnInit(): void {
    // Injeta NgControl preguiçosamente para evitar dependência circular
    try {
      this.ngControl = this.injector.get(NgControl, null, {
        optional: true,
        self: true
      });
    } catch (e) {
      console.warn("VInputDirective: Could not resolve NgControl", e);
    }

    if (this.ngControl) {
      // Monitora mudanças de status
      this.ngControl.statusChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateErrorState();
      });

      // Monitora mudanças de valor
      this.ngControl.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateErrorState();
      });
    }
  }

  // --- Implementação do ControlValueAccessor ---

  writeValue(value: any): void {
    const serializedValue = value ?? "";
    this.elementRef.nativeElement.value = serializedValue;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  // --- Manipuladores de Eventos ---

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChangeFn(value);
  }

  onBlur(): void {
    this.onTouched();
    this.updateErrorState();
  }

  // --- Auxiliares ---

  protected updateErrorState() {
    if (!this.ngControl) return;
    const isError = !!this.ngControl.invalid && (!!this.ngControl.touched || !!this.ngControl.dirty);
    this.hasError.set(isError);
  }
}
