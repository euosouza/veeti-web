import { TemplateRef } from "@angular/core";

export interface VTableColumn<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  fixed?: boolean | "left" | "right";
  align?: "left" | "center" | "right";
  type?: "text" | "number" | "date" | "currency" | "custom";
  render?: (row: T) => string | number | boolean;
  template?: TemplateRef<unknown>;
}
