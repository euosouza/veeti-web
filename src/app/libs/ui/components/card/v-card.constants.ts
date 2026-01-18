import { cva } from "class-variance-authority";

export const cardVariants = cva("bg-card-background text-card-foreground flex flex-col rounded-xl border border-border", {
  variants: {
    variant: {
      default: ""
    },
    size: {
      sm: "gap-4 py-4",
      md: "gap-6 py-6",
      lg: "gap-8 py-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const cardHeaderVariants = cva("@container/card-header border-border grid auto-rows-min grid-rows-[auto_auto] items-start gap-2", {
  variants: {
    size: {
      sm: "px-4 [.border-b]:pb-4",
      md: "px-6 [.border-b]:pb-6",
      lg: "px-8 [.border-b]:pb-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const cardTitleVariants = cva("leading-none font-semibold tracking-tight");

export const cardDescriptionVariants = cva("text-sm text-muted-foreground");

export const cardContentVariants = cva("", {
  variants: {
    size: {
      sm: "px-4",
      md: "px-6",
      lg: "px-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const cardFooterVariants = cva("flex flex-col gap-2 items-center border-border", {
  variants: {
    size: {
      sm: "px-4 [.border-t]:pt-4",
      md: "px-6 [.border-t]:pt-6",
      lg: "px-8 [.border-t]:pt-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
