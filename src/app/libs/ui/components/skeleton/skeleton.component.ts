import { Component, computed, effect, input, isDevMode } from "@angular/core";
import { VariantProps } from "class-variance-authority";

import { mergeClasses } from "../../utils/merge-class";
import { skeletonVariants } from "./skeleton.constants";

@Component({
  selector: "app-skeleton",
  standalone: true,
  imports: [],
  template: `<div [style.height]="height()" [style.width]="width()" [class]="elementClasses()"></div>`
})
export class SkeletonComponent {
  readonly height = input<string>("1rem");
  readonly width = input<string>("100%");
  readonly shape = input<VariantProps<typeof skeletonVariants>["shape"]>("square");

  protected readonly elementClasses = computed(() => mergeClasses(skeletonVariants({ shape: this.shape() })));

  private readonly validUnits = ["rem", "em", "px", "%", "vh", "vw", "vmin", "vmax", "cm", "mm", "in", "pt", "pc", "ex", "ch"];

  constructor() {
    effect(() => {
      if (isDevMode() && !this.isValid(this.height())) {
        throw new Error(`[app-skeleton] Valor de altura inválido:  "${this.height()}". Por favor, use uma unidade CSS válida.`);
      }
      if (isDevMode() && !this.isValid(this.width())) {
        throw new Error(`[app-skeleton] Valor de largura inválido: "${this.width()}". Por favor, use uma unidade CSS válida.`);
      }
    });
  }

  private isValid(value: string): boolean {
    if (value === "auto") return true;

    return this.validUnits.some((unit) => value.endsWith(unit));
  }
}
