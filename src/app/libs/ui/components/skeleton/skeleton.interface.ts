import { VariantProps } from "class-variance-authority";
import { skeletonVariants } from "./skeleton.constants";

export interface ISkeleton {
  height: string;
  width: string;
  shape: VariantProps<typeof skeletonVariants>["shape"];
}
