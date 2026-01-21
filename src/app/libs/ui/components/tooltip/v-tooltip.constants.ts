import { cva, type VariantProps } from "class-variance-authority";

export const tooltipVariants = cva(
  "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance"
);
export type VTooltipVariants = VariantProps<typeof tooltipVariants>;

export const tooltipPositionVariants = cva("absolute z-50 w-2 h-2 bg-foreground rotate-45 rounded-[1px]", {
  variants: {
    position: {
      top: "-bottom-1 left-1/2 -translate-x-1/2",
      bottom: "-top-1 left-1/2 -translate-x-1/2",
      left: "-right-1 top-1/2 -translate-y-1/2",
      right: "-left-1 top-1/2 -translate-y-1/2"
    }
  }
});

export type VTooltipPositionVariants = NonNullable<VariantProps<typeof tooltipPositionVariants>["position"]>;
