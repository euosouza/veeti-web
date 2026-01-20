import { cva, type VariantProps } from "class-variance-authority";

export const tabsListVariants = cva("flex w-full items-center justify-start gap-8", {
  variants: {
    width: {
      default: "w-auto",
      full: "w-full"
    },
    variant: {
      underline: "border-b border-border -mb-px",
      pill: "gap-2"
    }
  },
  defaultVariants: {
    width: "default",
    variant: "underline"
  }
});

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      width: {
        default: "w-auto",
        full: "w-full flex-1"
      },
      variant: {
        underline:
          "border-b-2 py-4 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-foreground",
        pill: "rounded-md px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted"
      }
    },
    defaultVariants: {
      width: "default",
      variant: "underline"
    }
  }
);

export const tabsContentVariants = cva("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2");

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
