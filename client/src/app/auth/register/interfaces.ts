export interface Field {
  name: string;
  label: string;
  placeholder: string;
  iconSrc: string;
  type?: string;
  autoComplete: string;
}

export interface User {
  [key: string]: string;
}

export interface HandleChange {
  (e: any): void;
}

export interface OnClickFunction {
  (e: any): void;
}
