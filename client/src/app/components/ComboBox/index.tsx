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
}: {
  optionsProps: OptionsPropsType[];
  placeholder?: string;
  styles: StylesConfig;
}) {
  const animatedComponents = makeAnimated();
  const { selectedOptions, isClient, handleChange } = useComboBox();

  const options = mapOptions(optionsProps);

  return (
    <div className="w-full">
      {isClient ? (
        <Select
          isMulti
          placeholder={placeholder}
          styles={styles}
          closeMenuOnSelect={false}
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
