import { cva, type VariantProps } from "class-variance-authority";

export const avatarVariants = cva("relative flex shrink-0 overflow-hidden bg-avatar-background text-foreground", {
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg"
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md"
    }
  },
  defaultVariants: {
    size: "md",
    shape: "circle"
  }
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
