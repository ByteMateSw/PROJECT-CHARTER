import { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { OptionsPropsType } from "./interfaces";
import { mapOptions } from "./mapOptions";
import { useComboBox } from "./hooks/useComboBox";

export default function ComboBox({
  optionsProps,
  placeholder = "Buscar...",
  styles,
  selectedOptions,
  setSelectedOptions,
  isMulti = false,
  optionsToDisable,
}: {
  optionsProps: OptionsPropsType[];
  placeholder?: string;
  styles: StylesConfig;
  selectedOptions: unknown;
  setSelectedOptions: any;
  isMulti?: boolean;
  optionsToDisable?: any;
}) {
  const animatedComponents = makeAnimated();
  const { isClient, handleChange } = useComboBox({
    selectedOptions,
    setSelectedOptions,
  });

  const options = mapOptions(optionsProps, optionsToDisable);

  return (
    <div className="w-full">
      {isClient ? (
        <Select
          isMulti={isMulti}
          placeholder={placeholder}
          styles={styles}
          closeMenuOnSelect={!isMulti}
          components={animatedComponents}
          value={selectedOptions}
          onChange={handleChange}
          options={options}
          menuPlacement="top"
        />
      ) : null}
    </div>
  );
}
