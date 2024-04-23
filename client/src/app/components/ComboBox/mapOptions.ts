import { OptionsPropsType } from "./interfaces";

export const mapOptions = (optionsProps: OptionsPropsType[]) => optionsProps?.map((option) => ({
  value: option.name,
  label: option.name,
}));