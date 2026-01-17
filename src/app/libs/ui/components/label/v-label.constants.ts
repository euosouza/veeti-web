import { cva, type VariantProps } from "class-variance-authority";

export const vLabelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
  variants: {
    variant: {
      default: "text-foreground",
      error: "text-error-500"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type VLabelVariants = VariantProps<typeof vLabelVariants>;
