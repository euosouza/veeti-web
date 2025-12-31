import { CommonModule, NgClass } from "@angular/common";
import { Component, computed, input, output } from "@angular/core";
import { IDefaultColor, ITypeSemanticColor } from "../../interfaces/colors.interfaces";

@Component({
  selector: "app-semantic-colors-grid",
  imports: [CommonModule, NgClass],
  standalone: true,
  templateUrl: "./semantic-colors-grid.component.html"
})
export class SemanticColorsGridComponent {
  title = input("");
  description = input("");
  icon = input("");
  colors = input<IDefaultColor[]>();
  type = input<ITypeSemanticColor>("info");

  colorClick = output<string>();

  containerClass = computed(() => {
    const currentClass = {
      warning: "border border-warning-300 bg-warning-100/50 dark:bg-warning-900/20 dark:border-warning-700/60",
      success: "border border-success-300 bg-success-100/50 dark:bg-success-900/20 dark:border-success-700/60",
      error: "border border-error-300 bg-error-100/50 dark:bg-error-900/20 dark:border-error-700/60",
      info: "border border-info-300 bg-info-100/50 dark:bg-info-900/20 dark:border-info-700/60"
    };

    return currentClass[this.type()];
  });

  iconClass = computed(() => {
    const currentClass = {
      warning: "text-warning-500",
      success: "text-success-500",
      error: "text-error-500",
      info: "text-info-500"
    };

    return currentClass[this.type()];
  });

  titleClass = computed(() => {
    const currentClass = {
      warning: "text-warning-900 dark:text-warning-100",
      success: "text-success-900 dark:text-success-100",
      error: "text-error-900 dark:text-error-100",
      info: "text-info-900 dark:text-info-100"
    };

    return currentClass[this.type()];
  });

  descriptionClass = computed(() => {
    const currentClass = {
      warning: "text-warning-700 dark:text-warning-100",
      success: "text-success-700 dark:text-success-100",
      error: "text-error-700 dark:text-error-100",
      info: "text-info-700 dark:text-info-100"
    };

    return currentClass[this.type()];
  });

  public onClickCopy(text: string) {
    this.colorClick.emit(text);
  }
}
