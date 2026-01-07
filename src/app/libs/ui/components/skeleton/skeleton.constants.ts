import { cva } from "class-variance-authority";

export const skeletonVariants = cva("bg-gradient-to-r from-skeleton-from via-skeleton-via to-skeleton-to bg-[length:200%_100%] animate-skeleton", {
  variants: {
    shape: {
      square: "rounded-md",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    shape: "square"
  }
});
