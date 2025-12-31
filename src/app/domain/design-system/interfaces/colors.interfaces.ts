export interface IColor {
  name: string;
  var: string;
}

export interface IDefaultColor extends IColor {
  oklch: string;
}

export interface ISemanticColor {
  title: string;
  description: string;
  icon: string;
  colors: IDefaultColor[];
  type: ITypeSemanticColor;
}

export type ITypeSemanticColor = "success" | "warning" | "error" | "info";
