"use client";
import { StylesConfig } from "react-select";
import { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

interface OptionsPropsType {
  name: string;
}

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
  const [selectedOptions, setSelectedOptions] = useState<unknown>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (selectedOptions: unknown) => {
    setSelectedOptions(selectedOptions);
  };

  const options = optionsProps?.map((option) => ({
    value: option.name,
    label: option.name,
  }));

  return (
    <div className="w-full">
      {isClient ? (
        <Select
          styles={styles}
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
