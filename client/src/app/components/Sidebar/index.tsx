"use client";
import Image from "next/image";
import ComboBox from "../ComboBox";
import { useSidebarState } from "./hooks/useSidebarState";
import { useSidebarEffects } from "./hooks/useSidebarEffects";
import { useSidebarEvents } from "./hooks/useSidebarEvents";
import { styleComboBox } from "./SidebarStyles";

export default function Sidebar(): JSX.Element {
  const {
    locations,
    setLocations,
    searchTerm,
    setSearchTerm,
    selectedProfessions,
    setSelectedProfessions,
    professions,
    setProfessions,
    checkedItems,
    setCheckedItems,
  } = useSidebarState();

  useSidebarEffects({
    setLocations,
    selectedProfessions,
    setSelectedProfessions,
    professions,
    setProfessions,
    setCheckedItems,
  });

  const { handleCheckboxChange, handleSearchTermChange } = useSidebarEvents({
    setCheckedItems,
    setSelectedProfessions,
    professions,
    setSearchTerm,
  });

  const measure = 20;

  return (
    <>
      <div className="flex cursor-default select-none mb-4 ml-1">
        <Image
          src="/svg/briefcase.svg"
          alt="Location Icon"
          width={measure}
          height={measure}
        />
        <span className="ml-1 text-secondary-black text-xl font-bold">
          Profesiones
        </span>
      </div>
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
          className="flex-1 focus:outline-none w-5 ml-2 bg-transparent"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </section>

      <ul className="overflow-y-scroll minimal-scrollbar w-full mt-6 select-none">
        {professions
          .filter((profession) =>
            profession.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((profession, id) => {
            return (
              <li
                key={id}
                className="flex items-center py-1 w-fit hover:underline cursor-pointer"
                onClick={() => handleCheckboxChange(id)}
              >
                <input
                  className={`ml-2 rounded-full appearance-none w-2 h-2 ring-2 ring-offset-2 ring-secondary-black items-center justify-center cursor-pointer ${
                    checkedItems[id]
                      ? " bg-primary-blue ring-2"
                      : "bg-secondary-white"
                  }`}
                  id={`${id}`}
                  type="checkbox"
                  checked={checkedItems[id] || false}
                  onChange={() => {}}
                />
                <label className="text-secondary-black text-base ml-2 cursor-pointer">
                  {profession.name}
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
          selectedOptions={locations.provinces}
          setSelectedOptions={setLocations}
          optionsProps={locations.provinces}
          placeholder="Provincia"
          styles={styleComboBox}
        />
        <ComboBox
          selectedOptions={locations.cities}
          setSelectedOptions={setLocations}
          optionsProps={locations.cities}
          placeholder="Localidades"
          styles={styleComboBox}
        />
      </section>
    </>
  );
}
