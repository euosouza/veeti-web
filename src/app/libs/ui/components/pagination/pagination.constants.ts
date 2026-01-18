import { cva } from "class-variance-authority";

export const paginationVariants = cva("flex items-center gap-1 flex-wrap justify-center", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
