import { OptionsPropsType } from "./interfaces";

export const mapOptions = (
  optionsProps: OptionsPropsType[] | undefined,
  optionsToDisable: { name: string }[] = []
) => {
  const disabledNames = optionsToDisable.map((option) => option.name);
  return optionsProps?.map((option) => ({
    value: option.name,
    label: option.name,
    isDisabled: disabledNames.includes(option.name),
  }));
};
