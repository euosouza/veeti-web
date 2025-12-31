import { ISemanticColor } from "../interfaces/colors.interfaces";

export const SEMANTIC_COLORS: ISemanticColor[] = [
  {
    title: "Success",
    description: "Used to indicate success or a positive outcome.",
    icon: "check_circle",
    type: "success",
    colors: [
      { name: "Success 100", var: "--color-success-100", oklch: "95% 0.05 150" },
      { name: "Success 300", var: "--color-success-300", oklch: "85% 0.1 150" },
      { name: "Success 500", var: "--color-success-500", oklch: "65% 0.15 150" },
      { name: "Success 700", var: "--color-success-700", oklch: "50% 0.12 150" },
      { name: "Success 900", var: "--color-success-900", oklch: "35% 0.1 150" }
    ]
  },
  {
    title: "Warning",
    description: "Used to indicate a warning or caution.",
    icon: "warning",
    type: "warning",
    colors: [
      { name: "Warning 100", var: "--color-warning-100", oklch: "95% 0.05 80" },
      { name: "Warning 300", var: "--color-warning-300", oklch: "85% 0.1 80" },
      { name: "Warning 500", var: "--color-warning-500", oklch: "75% 0.15 80" },
      { name: "Warning 700", var: "--color-warning-700", oklch: "60% 0.12 80" },
      { name: "Warning 900", var: "--color-warning-900", oklch: "45% 0.1 80" }
    ]
  },
  {
    title: "Error",
    description: "Used to indicate an error or a failed action.",
    icon: "error",
    type: "error",
    colors: [
      { name: "Error 100", var: "--color-error-100", oklch: "95% 0.07 25" },
      { name: "Error 300", var: "--color-error-300", oklch: "85% 0.14 25" },
      { name: "Error 500", var: "--color-error-500", oklch: "65% 0.2 25" },
      { name: "Error 700", var: "--color-error-700", oklch: "50% 0.16 25" },
      { name: "Error 900", var: "--color-error-900", oklch: "35% 0.12 25" }
    ]
  },
  {
    title: "Info",
    description: "Used to provide informational messages.",
    icon: "info",
    type: "info",
    colors: [
      { name: "Info 100", var: "--color-info-100", oklch: "95% 0.05 240" },
      { name: "Info 300", var: "--color-info-300", oklch: "85% 0.1 240" },
      { name: "Info 500", var: "--color-info-500", oklch: "65% 0.15 240" },
      { name: "Info 700", var: "--color-info-700", oklch: "50% 0.12 240" },
      { name: "Info 900", var: "--color-info-900", oklch: "35% 0.1 240" }
    ]
  }
];
