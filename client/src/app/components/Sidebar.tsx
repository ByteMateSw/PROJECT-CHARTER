"use client";
import { useEffect, useState } from "react";
import { professions } from "@/json/professions";
import Image from "next/image";
import ComboBox from "./ComboBox";
import { getCities, getProvinces } from "../api/locations";
import { StylesConfig } from "react-select";
export default function Sidebar(): JSX.Element {
  const [provinces, setProvinces] = useState<any>();

  const [cities, setCities] = useState<any>();

  useEffect(() => {
    getProvinces().then((data: any) => {
      setProvinces(data);
    });
    getCities().then((data: any) => {
      setCities(data);
    });
  }, []);

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

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const measure = 24;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };

      if (updatedCheckedItems[index]) {
        delete updatedCheckedItems[index];
      } else {
        updatedCheckedItems[index] = true;
      }

      return updatedCheckedItems;
    });
  };
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCheckedItems({});
  };

  return (
    <>
      <nav className="flex h-full w-80 p-6 ml-4 flex-col items-start flex-1 border rounded-3xl border-secondary-gray overflow-y-hidden">
        <section className="flex w-full items-center rounded-lg border justify-start border-secondary-gray px-2 py-1">
          <Image
            src="/svg/briefcase.svg"
            alt="Briefcase Icon"
            width={measure}
            height={measure}
          />
          <input
            type="text"
            placeholder="Buscar profesión:"
            className="flex-1 focus:outline-none w-5 ml-2"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </section>

        <ul className="overflow-y-scroll minimal-scrollbar w-full mt-6 select-none">
          {professions
            .filter((profesion) =>
              profesion.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((profesion, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center py-1 w-fit hover:underline cursor-pointer"
                  onClick={() => handleCheckboxChange(index)}
                >
                  <input
                    className={`ml-2 rounded-full appearance-none w-2 h-2 ring-2 ring-offset-2 ring-secondary-black items-center justify-center cursor-pointer ${
                      checkedItems[index]
                        ? " bg-primary-blue ring-2"
                        : "bg-secondary-white"
                    }`}
                    id={`${index}`}
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => {}}
                  />
                  <label className="text-secondary-black text-base ml-2 cursor-pointer">
                    {profesion.name}
                  </label>
                </li>
              );
            })}
        </ul>
        <hr className="w-full mt-6" />
        <section className="w-full flex flex-col flex-1 justify-end items-start py-6 gap-4">
          <div className="flex cursor-default select-none">
            <Image
              src="/svg/location.svg"
              alt="Location Icon"
              width={measure}
              height={measure}
            />
            <span className="ml-1 text-secondary-black text-xl font-bold">
              Ubicación
            </span>
          </div>
          <ComboBox
            optionsProps={provinces}
            placeholder="Provincia"
            styles={styleComboBox}
          />
          <ComboBox
            optionsProps={cities}
            placeholder="Localidades"
            styles={styleComboBox}
          />
        </section>
      </nav>
    </>
  );
}
