import { cva, type VariantProps } from "class-variance-authority";

export const vInputVariants = cva(
  "w-full rounded-md tracking-normal border text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input-border bg-input-background focus-visible:ring-input-border-focus ring-offset-background",
        error: "border-error-500 bg-input-background focus-visible:ring-error-500 text-error-500 placeholder:text-error-500/60 ring-offset-background",
        success: "border-success-500 bg-input-background focus-visible:ring-success-500 ring-offset-background"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 px-3 py-1 text-xs",
        lg: "h-12 px-5 py-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type VInputVariants = VariantProps<typeof vInputVariants>;
