"use client";
import { StylesConfig } from "react-select";
import { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";

interface OptionsPropsType {
  name: string;
}

const styleComboBox: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#FBFCFF",
    color: "#97989B",
    borderWidth: "1px",
    padding: "0.2rem",
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#97989B",
    borderRadius: "1rem",
    appearance: "none",
  }),
};

export default function ComboBox({
  optionsProps,
  placeholder = "Buscar...",
}: {
  optionsProps: OptionsPropsType[];
  placeholder?: string;
}) {
  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState<unknown>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (selectedOptions: unknown) => {
    setSelectedOptions(selectedOptions);
  };

  const options = optionsProps.map((option) => ({
    value: option.name,
    label: option.name,
  }));

  return (
    <div className="w-full">
      {isClient ? (
        <AsyncSelect
          cacheOptions
          defaultOptions
          styles={styleComboBox}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          placeholder={placeholder}
          value={selectedOptions}
          onChange={handleChange}
          options={options}
          menuPlacement="top"
        />
      ) : null}
    </div>
  );
}
