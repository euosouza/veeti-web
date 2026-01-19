import { cva, type VariantProps } from "class-variance-authority";

export const loadingVariants = cva("inline-block align-[-0.125em]", {
  variants: {
    variant: {
      spinner: "animate-spin rounded-full border-solid border-current border-e-transparent border-2 motion-reduce:animate-[spin_1.5s_linear_infinite]",
      dots: "animate-bounce", // We will handle custom dots in the component
      pulse: "animate-pulse bg-current rounded-full",
      bars: "",
      ring: "animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
    },
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12"
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground"
    }
  },
  defaultVariants: {
    variant: "spinner",
    size: "md",
    color: "primary"
  }
});

export type LoadingVariants = VariantProps<typeof loadingVariants>;
