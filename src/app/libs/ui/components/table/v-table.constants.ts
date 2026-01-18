import { cva, type VariantProps } from "class-variance-authority";

export const tableVariants = cva("min-w-full text-sm", {
  variants: {
    variant: {
      default: "bg-background",
      striped: "bg-background"
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const tableHeaderVariants = cva("font-medium text-muted-foreground border-border  border-b", {
  variants: {
    size: {
      sm: "h-10 px-2",
      md: "h-12 px-4",
      lg: "h-14 px-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const tableCellVariants = cva("border-b border-border text-foreground", {
  variants: {
    size: {
      sm: "h-10 px-2",
      md: "h-12 px-4",
      lg: "h-14 px-6"
    },
    fixed: {
      true: "sticky z-10 bg-background group-hover:bg-primary-100",
      false: ""
    }
  },
  defaultVariants: {
    size: "md",
    fixed: false
  }
});

export type TableVariants = VariantProps<typeof tableVariants>;
