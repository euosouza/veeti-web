import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm flex items-start gap-4", {
  variants: {
    variant: {
      default: "bg-background border-border text-foreground",
      destructive: "border-error-500/50 text-error-500 dark:border-error-500",
      success: "border-success-500/50 text-success-500 dark:border-success-500",
      warning: "border-warning-500/50 text-warning-500 dark:border-warning-500",
      info: "border-info-500/50 text-info-500 dark:border-info-500"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const alertTitleVariants = cva("mb-1 font-medium leading-none tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const alertIconVariants = cva("h-4 w-4");

export type AlertVariants = VariantProps<typeof alertVariants>;
