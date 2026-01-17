import { cva, type VariantProps } from "class-variance-authority";

export const dividerVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      transparent: "bg-transparent"
    },
    direction: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]"
    }
  },
  defaultVariants: {
    variant: "default",
    direction: "horizontal"
  }
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
