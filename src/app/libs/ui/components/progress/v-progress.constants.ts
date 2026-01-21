import { cva } from "class-variance-authority";

export const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-4",
      xl: "h-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-success-500",
      destructive: "bg-error-500",
      warning: "bg-warning-500",
      info: "bg-info-500",
      custom: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
