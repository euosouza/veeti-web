import { cva } from "class-variance-authority";

export const statesBtnVariant = {
  primary: {
    default: "bg-primary-500 text-white",
    hover: "hover:bg-primary-600 hover:text-white",
    focused: "focus-visible:ring-2 focus-visible:ring-primary-400",
    disabled: "disabled:bg-neutral-300/40 disabled:dark:bg-neutral-100/40 disabled:text-white disabled:dark:text-white/50 disabled:cursor-not-allowed"
  },
  secondary: {
    default: "bg-secondary-400 text-white",
    hover: "hover:bg-secondary-500 hover:text-white",
    focused: "focus-visible:ring-2 focus-visible:ring-secondary-400",
    disabled: "disabled:bg-neutral-300/40 disabled:dark:bg-neutral-100/40 disabled:text-white disabled:dark:text-white/50 disabled:cursor-not-allowed"
  },
  outline: {
    default: "border border-border text-foreground",
    hover: "hover:bg-neutral-950 hover:text-neutral-100 hover:dark:bg-neutral-100 hover:dark:text-neutral-950",
    focused: "focus-visible:ring-2 focus-visible:ring-neutral-400",
    disabled: "disabled:bg-neutral-300/40 disabled:dark:bg-neutral-100/40 disabled:text-white disabled:dark:text-white/50 disabled:cursor-not-allowed"
  },
  link: {
    default: "text-primary-500 underline",
    hover: "hover:text-primary-600 hover:underline",
    focused: "focus-visible:ring-2 focus-visible:ring-primary-400",
    disabled: "disabled:text-primary-300 disabled:cursor-not-allowed"
  },
  destructive: {
    default: "bg-red-500 text-white",
    hover: "hover:bg-red-600 hover:text-white",
    focused: "focus-visible:ring-2 focus-visible:ring-red-400",
    disabled: "disabled:bg-neutral-300/40 disabled:dark:bg-neutral-100/40 disabled:text-white disabled:dark:text-white/50 disabled:cursor-not-allowed"
  },
  icon: {
    default: "text-foreground",
    hover: "hover:bg-card-background hover:dark:bg-neutral-700 ",
    focused: "focus-visible:ring-2 focus-visible:ring-foreground-400",
    disabled: "disabled:text-foreground-300 disabled:cursor-not-allowed disabled:hover:opacity-30"
  }
};

export const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors cursor-pointer", {
  variants: {
    variant: {
      primary: [statesBtnVariant.primary.default, statesBtnVariant.primary.hover, statesBtnVariant.primary.focused, statesBtnVariant.primary.disabled],
      secondary: [statesBtnVariant.secondary.default, statesBtnVariant.secondary.hover, statesBtnVariant.secondary.focused, statesBtnVariant.secondary.disabled],
      destructive: [statesBtnVariant.destructive.default, statesBtnVariant.destructive.hover, statesBtnVariant.destructive.focused, statesBtnVariant.destructive.disabled],
      outline: [statesBtnVariant.outline.default, statesBtnVariant.outline.hover, statesBtnVariant.outline.focused, statesBtnVariant.outline.disabled],
      icon: [statesBtnVariant.icon.default, statesBtnVariant.icon.hover, statesBtnVariant.icon.focused, statesBtnVariant.icon.disabled],
      link: [statesBtnVariant.link.default, statesBtnVariant.link.hover, statesBtnVariant.link.focused, statesBtnVariant.link.disabled]
    },
    size: {
      sm: "h-9 rounded-md px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-11 rounded-md px-8 text-base"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});
