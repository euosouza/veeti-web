import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { twMerge } from "tailwind-merge";
import { loadingVariants, type LoadingVariants } from "./v-loading.constants";

@Component({
  selector: "v-loading",
  imports: [CommonModule],
  template: `
    @if (variant() === "spinner") {
      <div [class]="computedClass()" role="status">
        <span class="sr-only">Carregando...</span>
      </div>
    } @else if (variant() === "dots") {
      <div class="flex items-center gap-1" [class]="class()" role="status">
        <div [class]="dotClass()" style="animation-delay: -0.3s"></div>
        <div [class]="dotClass()" style="animation-delay: -0.15s"></div>
        <div [class]="dotClass()"></div>
        <span class="sr-only">Carregando...</span>
      </div>
    } @else if (variant() === "pulse") {
      <div [class]="computedClass()" role="status">
        <span class="sr-only">Carregando...</span>
      </div>
    } @else if (variant() === "bars") {
      <div class="flex items-end gap-1" [class]="class()" role="status">
        <div [class]="barClass()" style="animation-delay: -0.45s"></div>
        <div [class]="barClass()" style="animation-delay: -0.3s"></div>
        <div [class]="barClass()" style="animation-delay: -0.15s"></div>
        <div [class]="barClass()"></div>
        <span class="sr-only">Carregando...</span>
      </div>
    } @else if (variant() === "ring") {
      <div [class]="computedClass()" role="status">
        <span class="sr-only">Carregando...</span>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "inline-flex items-center justify-center relative"
  }
})
export class VLoadingComponent {
  readonly variant = input<LoadingVariants["variant"]>("spinner");
  readonly size = input<LoadingVariants["size"]>("md");
  readonly color = input<LoadingVariants["color"]>("primary");
  readonly class = input<string>("");

  protected computedClass = computed(() => {
    return twMerge(
      loadingVariants({
        variant: this.variant(),
        size: this.size(),
        color: this.color()
      }),
      this.class()
    );
  });

  protected dotClass = computed(() => {
    const sizeMap: Record<string, string> = {
      xs: "h-1 w-1",
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
      xl: "h-4 w-4"
    };

    const colorMap: Record<string, string> = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      muted: "bg-muted-foreground"
    };

    return twMerge("rounded-full animate-bounce", sizeMap[this.size() ?? "md"], colorMap[this.color() ?? "primary"]);
  });

  protected barClass = computed(() => {
    const sizeMap: Record<string, string> = {
      xs: "w-0.5 h-3",
      sm: "w-1 h-4",
      md: "w-1.5 h-6",
      lg: "w-2 h-8",
      xl: "w-2.5 h-12"
    };

    const colorMap: Record<string, string> = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      muted: "bg-muted-foreground"
    };

    return twMerge("rounded-sm animate-[pulse_1s_ease-in-out_infinite]", sizeMap[this.size() ?? "md"], colorMap[this.color() ?? "primary"]);
  });
}
