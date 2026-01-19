import { InjectionToken, Signal } from "@angular/core";
import { cva, type VariantProps } from "class-variance-authority";

export interface IRadioGroup {
  value: Signal<unknown>;
  computedVariant: Signal<string>;
  size: Signal<string>;
  isDisabled: Signal<boolean>;
  inputId: Signal<string>;
  selectValue: (value: unknown) => void;
}

export const RADIO_GROUP_TOKEN = new InjectionToken<IRadioGroup>("RADIO_GROUP_TOKEN");

export const radioGroupVariants = cva("flex flex-col gap-2");

export const radioButtonVariants = cva("group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-[0.98] focus:outline-none", {
  variants: {
    variant: {
      default: "text-foreground",
      error: "text-error-500"
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base"
    },
    disabled: {
      true: "cursor-not-allowed opacity-50 active:scale-100 hover:opacity-50",
      false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false
  }
});

export const radioCircleVariants = cva(
  "aspect-square rounded-full border ring-offset-background transition-all group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-primary text-primary",
        error: "border-error-500 text-error-500"
      },
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5"
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "group-hover:opacity-80 group-active:scale-[0.85]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false
    }
  }
);

export const radioDotVariants = cva("rounded-full bg-current transition-all", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
export type RadioButtonVariants = VariantProps<typeof radioButtonVariants>;
export type RadioDotVariants = VariantProps<typeof radioDotVariants>;
