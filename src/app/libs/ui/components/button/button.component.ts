import { Component, computed, EventEmitter, input, Output } from "@angular/core";
import { VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { buttonVariants } from "./button.constants";

@Component({
  selector: "app-button",
  imports: [],
  template: `<button [class]="classes()" [disabled]="isDisabled()" (click)="handleClick()">
    @if (loading()) {
      <span
        class="animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] h-4 w-4"
      ></span>
      @if (variant() !== "icon") {
        <span>Carregando</span>
      }
    } @else {
      <ng-content></ng-content>
    }
  </button>`
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly class = input<ClassValue>("");
  readonly variant = input<VariantProps<typeof buttonVariants>["variant"]>("primary");
  readonly size = input<VariantProps<typeof buttonVariants>["size"]>("md");

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly classes = computed(() => mergeClasses(buttonVariants({ variant: this.variant(), size: this.size() }), this.class()));

  public handleClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.onClick.emit();
  }
}
