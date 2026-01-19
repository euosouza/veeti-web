import { TemplateRef } from "@angular/core";
import { BadgeSize, BadgeVariant } from "../badge/badge.constants";

export interface VTableColumnBadge<T> {
  variant?: BadgeVariant | ((row: T) => BadgeVariant);
  size?: BadgeSize | ((row: T) => BadgeSize);
  class?: string | ((row: T) => string);
}

export interface VTableAction<T> {
  label: string;
  icon?: string;
  action?: (row: T) => void;
  danger?: boolean;
  disabled?: boolean | ((row: T) => boolean);
}

export interface VTableColumn<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  fixed?: boolean | "left" | "right";
  align?: "left" | "center" | "right";
  type?: "text" | "number" | "actions" | "date" | "currency" | "badge" | "custom";
  badge?: VTableColumnBadge<T>;
  actions?: VTableAction<T>[];
  render?: (row: T) => string | number | boolean;
  template?: TemplateRef<unknown>;
}
