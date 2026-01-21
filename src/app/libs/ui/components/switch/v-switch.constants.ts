import { cva, type VariantProps } from "class-variance-authority";

export const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background",
  {
    variants: {
      variant: {
        default: ""
      },
      size: {
        sm: "h-5 w-9",
        md: "h-[24px] w-[44px]",
        lg: "h-7 w-[52px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export const switchThumbVariants = cva("pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0", {
  variants: {
    size: {
      sm: "h-4 w-4 data-[state=checked]:translate-x-4",
      md: "h-5 w-5 data-[state=checked]:translate-x-5",
      lg: "h-6 w-6 data-[state=checked]:translate-x-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
