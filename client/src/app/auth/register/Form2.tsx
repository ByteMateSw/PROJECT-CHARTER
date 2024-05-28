"use client";
import InputField from "@/app/components/auth/register/InputField";
import { Field, HandleChange, OnClickFunction, User } from "./interfaces";
import DatePicker from "@/app/components/auth/register/DatePicker";
import ComboBox from "@/app/components/ComboBox";
import { StylesConfig } from "react-select";
import {
  CheckedItems,
  Locations,
} from "@/app/components/Sidebar/hooks/interfaces";
import { useState } from "react";

export const styleComboBox: StylesConfig = {
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
    borderRadius: "1.5rem",
    appearance: "none",
    width: "100%",
    height: "3rem",
  }),
};

export default function Form2({
  fields,
  errorMessage,
  user,
  handleChange,
  onClickFunction,
  handleSubmit,
  locations,
  inputValue,
  setInputValue,
  selected,
  setSelected,
  province,
  setProvince,
  city,
  setCity,
}: {
  fields: Field[];
  errorMessage: string;
  user: User;
  handleChange: HandleChange;
  onClickFunction: OnClickFunction;
  handleSubmit: OnClickFunction;
  locations: Locations;
  inputValue: string;
  setInputValue: any;
  selected: any;
  setSelected: any;
  province: unknown;
  setProvince: any;
  city: unknown;
  setCity: any;
}) {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>([]);
  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevCheckedItems: CheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };

      updatedCheckedItems[id]
        ? delete updatedCheckedItems[id]
        : (updatedCheckedItems[id] = true);

      return updatedCheckedItems;
    });
  };

  return (
    <>
      <section className="flex flex-col justify-between">
        <label htmlFor="date" className="block mb-1 ml-4 font-bold text-xl">
          Fecha de Nacimiento
        </label>
        <DatePicker
          id="date"
          inputValue={inputValue}
          selected={selected}
          setInputValue={setInputValue}
          setSelected={setSelected}
        />
      </section>
      <section className="flex flex-wrap justify-between w-full">
        {/* Primer campo de entrada */}
        <div className="my-4 w-full md:w-1/2 md:pr-2">
          <label
            htmlFor={fields[0].name}
            className="block mb-1 ml-4 font-bold text-xl"
          >
            {fields[0].label}
          </label>
          <InputField
            id={fields[0].name}
            type={fields[0].type || "text"}
            name={fields[0].name}
            placeholder={fields[0].placeholder}
            value={user[fields[0].name]}
            onChange={handleChange}
            iconSrc={fields[0].iconSrc}
            autoComplete={fields[0].autoComplete}
          />
        </div>

        {/* Segundo campo de entrada */}
        <div className="my-4 w-full md:w-1/2 md:pl-2">
          <label
            htmlFor={fields[1].name}
            className="block mb-1 ml-4 font-bold text-xl"
          >
            {fields[1].label}
          </label>
          <InputField
            id={fields[1].name}
            type={fields[1].type || "text"}
            name={fields[1].name}
            placeholder={fields[1].placeholder}
            value={`${user[fields[1].name]}`}
            onChange={handleChange}
            iconSrc={fields[1].iconSrc}
            autoComplete={fields[1].autoComplete}
          />
        </div>

        {/* Campos de selección de provincia y ciudad */}
        <div className="flex flex-wrap w-full">
          <div className="my-4 w-full md:w-1/2 md:pr-2">
            <label
              htmlFor="province"
              className="block mb-1 ml-4 font-bold text-xl"
            >
              Provincia
            </label>
            <ComboBox
              optionsProps={locations.provinces}
              styles={styleComboBox}
              placeholder="Provincia"
              selectedOptions={province}
              setSelectedOptions={setProvince}
            />
          </div>
          <div className="my-4 w-full md:w-1/2 md:pl-2">
            <label htmlFor="city" className="block mb-1 ml-4 font-bold text-xl">
              Ciudad
            </label>
            <ComboBox
              optionsProps={locations.cities}
              styles={styleComboBox}
              placeholder="Ciudad"
              selectedOptions={city}
              setSelectedOptions={setCity}
            />
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col justify-center my-2">
        <div className="text-red-500 w-full flex justify-center">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <span className="flex items-center mb-6 w-fit cursor-default">
          <input
            className={`ml-2 rounded-full appearance-none w-2 h-2 ring-2 ring-offset-2 ring-secondary-black items-center justify-center cursor-pointer ${
              checkedItems[522]
                ? " bg-primary-blue ring-2"
                : "bg-secondary-white"
            }`}
            id={`${522}`}
            type="checkbox"
            checked={checkedItems[522] || false}
            onClick={() => handleCheckboxChange(522)}
            onChange={() => {}}
          />
          <label className="text-secondary-black text-base ml-2 cursor-default">
            Acepto los
            <a href="" className="text-primary-blue hover:underline">
              Términos y condiciones{" "}
            </a>
            y la
            <a href="" className="text-primary-blue hover:underline">
              {" "}
              Política de Privacidad
            </a>
          </label>
        </span>
        <div className="flex justify-center items-center mx-8 gap-20">
          <button
            id="submit"
            type="submit"
            className="w-full h-12 bg-primary-blue rounded-3xl text-secondary-white text-xl mb-2 hover:scale-105 duration-150"
            onClick={onClickFunction}
          >
            Volver
          </button>
          <button
            id="submit"
            type="submit"
            className="w-full h-12 bg-primary-blue rounded-3xl text-secondary-white text-xl mb-2 hover:scale-105 duration-150"
            onClick={handleSubmit}
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
}
