import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-tertiary text-white hover:bg-tertiary-600",
        success: "border-success-500/60 bg-success-100/20 text-success-500/60 hover:bg-success/80",
        danger: "border-error-500/60 bg-error-100/20 text-error-500/60 hover:bg-error/80",
        warning: "border-warning-500/60 bg-warning-100/20 text-warning-500/60 hover:bg-warning/80",
        info: "border-info-500/60 bg-info-100/20 text-info-500/60 hover:bg-info/80",
        dark: "border-border bg-gray-800 text-gray-50 hover:bg-gray-800/80",
        outline: "text-foreground border-neutral-500",
        notification: "border-transparent bg-tertiary text-white hover:bg-tertiary-600 rounded-full"
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export type BadgeVariant = BadgeVariantProps["variant"];
export type BadgeSize = BadgeVariantProps["size"];
