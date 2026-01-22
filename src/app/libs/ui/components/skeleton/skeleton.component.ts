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
      if (isDevMode()) {
        if (!this.isValid(this.height())) {
          console.warn(`[app-skeleton] Altura potencialmente inválida: "${this.height()}". Recomenda-se usar uma unidade CSS válida.`);
        }
        if (!this.isValid(this.width())) {
          console.warn(`[app-skeleton] Largura potencialmente inválida: "${this.width()}". Recomenda-se usar uma unidade CSS válida.`);
        }
      }
    });
  }

  private isValid(value: string): boolean {
    const trimmed = value.trim();
    if (trimmed === "auto" || trimmed.startsWith("calc") || trimmed.startsWith("var")) return true;
    return this.validUnits.some((unit) => trimmed.endsWith(unit));
  }
}
