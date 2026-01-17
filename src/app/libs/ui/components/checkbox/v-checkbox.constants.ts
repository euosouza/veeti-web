import { cva, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
  "peer appearance-none shrink-0 rounded-sm border border-input-border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  checked:bg-primary checked:text-primary-foreground checked:border-primary checked:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: ""
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
