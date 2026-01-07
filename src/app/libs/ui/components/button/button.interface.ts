export interface IVariantBtn {
  primary: IStatesBtn;
  secondary: IStatesBtn;
  outline: IStatesBtn;
  link: IStatesBtn;
  destructive: IStatesBtn;
  icon: IStatesBtn;
}

export type TVariantBtn = keyof IVariantBtn;

export interface IStatesBtn {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}
