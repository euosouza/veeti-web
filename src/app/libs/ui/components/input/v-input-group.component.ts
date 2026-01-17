import { Component, computed, contentChild, effect, input, ViewEncapsulation } from "@angular/core";
import { VInputDirective } from "./v-input.directive";

@Component({
  selector: "v-input-group",
  standalone: true,
  imports: [],
  template: `
    <div class="relative w-full">
      @if (startIcon()) {
        <span
          class="material-symbols-rounded absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none select-none {{ startIconClass() }}"
          [style.font-size]="iconFontSize()"
          aria-hidden="true"
        >
          {{ startIcon() }}
        </span>
      }

      <ng-content></ng-content>

      @if (endIcon()) {
        <span
          class="material-symbols-rounded absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none select-none {{ endIconClass() }}"
          [style.font-size]="iconFontSize()"
          aria-hidden="true"
        >
          {{ endIcon() }}
        </span>
      }
    </div>
  `,
  host: {
    class: "block w-full"
  },
  encapsulation: ViewEncapsulation.None
})
export class VInputGroupComponent {
  readonly startIcon = input<string>();
  readonly endIcon = input<string>();

  // Access the projected input directive
  readonly inputDirective = contentChild(VInputDirective);

  /* Helper to calculate icon classes based on position */
  private getIconClass(position: "start" | "end") {
    const size = this.inputDirective()?.size() || "default";
    let positionClass = "";

    switch (size) {
      case "sm":
        positionClass = position === "start" ? "left-2.5" : "right-2.5";
        break;
      case "lg":
        positionClass = position === "start" ? "left-3.5" : "right-3.5";
        break;
      default:
        positionClass = position === "start" ? "left-3" : "right-3";
        break;
    }
    return positionClass;
  }

  /* Helper to calculate icon font size */
  private getIconSize() {
    const size = this.inputDirective()?.size() || "default";
    switch (size) {
      case "sm":
        return "16px";
      case "lg":
        return "18px";
      default:
        return "18px";
    }
  }

  readonly startIconClass = computed(() => this.getIconClass("start"));
  readonly endIconClass = computed(() => this.getIconClass("end"));
  readonly iconFontSize = computed(() => this.getIconSize());

  constructor() {
    effect(() => {
      const inputDir = this.inputDirective();
      if (!inputDir) return;

      const element = inputDir.elementRef.nativeElement as HTMLElement;
      const size = inputDir.size();

      // Reset padding classes
      element.classList.remove("pl-8", "pl-10", "pl-12", "pr-8", "pr-10", "pr-12");

      // Apply padding classes based on icons presence and size
      // Sizing:
      // sm: px-3 -> icon needs more. say pl-8
      // default: px-4 -> icon pl-10
      // lg: px-5 -> icon pl-12

      if (this.startIcon()) {
        if (size === "sm") element.classList.add("pl-8");
        else if (size === "lg") element.classList.add("pl-10");
        else element.classList.add("pl-10");
      }

      if (this.endIcon()) {
        if (size === "sm") element.classList.add("pr-8");
        else if (size === "lg") element.classList.add("pr-10");
        else element.classList.add("pr-10");
      }
    });
  }
}
