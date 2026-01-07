import { Component, computed, EventEmitter, input, Output } from "@angular/core";
import { VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../utils/merge-class";
import { buttonVariants } from "./button.constants";

@Component({
  selector: "app-button",
  imports: [],
  template: `<button [class]="classes()" [disabled]="disabled()" (click)="handleClick()">
    <ng-content></ng-content>
  </button>`
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  readonly disabled = input<boolean>(false);
  readonly class = input<ClassValue>("");
  readonly variant = input<VariantProps<typeof buttonVariants>["variant"]>("primary");
  readonly size = input<VariantProps<typeof buttonVariants>["size"]>("md");

  protected readonly classes = computed(() => mergeClasses(buttonVariants({ variant: this.variant(), size: this.size() }), this.class()));

  public handleClick(): void {
    if (this.disabled()) {
      return;
    }

    this.onClick.emit();
  }
}
