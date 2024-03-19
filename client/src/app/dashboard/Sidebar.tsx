"use client";
import React, { useState } from "react";
import { professions } from "@/json/professions";
import Image from "next/image";
import Header from "../ui/Header/Header";

export default function Sidebar(): JSX.Element {
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
      <Header />
      <nav className="flex h-screen w-72 px-6 py-8 flex-col items-start flex-1 border-r-2 border-secondary-gray overflow-y-hidden">
        <section className="flex w-52 items-center rounded-lg border justify-start border-secondary-gray px-2 py-1">
          <Image
            src="/svg/glass.svg"
            alt="Glass Icon"
            width={measure}
            height={measure}
          />
          <input
            type="text"
            placeholder="Buscar profesión:"
            className="flex-1 focus:outline-none w-5"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </section>

        <ul className="overflow-y-scroll w-full py-4">
          {professions
            .filter((profesion) =>
              profesion.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((profesion, index) => {
              return (
                <li key={index} className="flex items-center py-1">
                  <input
                    className={`rounded-full appearance-none w-4 h-4 border-2 border-neutral-900 ${
                      checkedItems[index] ? "bg-blue-500" : "bg-white"
                    } focus:ring-2 focus:ring-blue-500`}
                    id={`${index}`}
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label className="text-neutral-900 text-base ml-2">
                    {profesion.name}
                  </label>
                </li>
              );
            })}
        </ul>

        <section className="w-full flex flex-col flex-1 justify-end items-start py-8 border-t gap-4">
          <a className="text-secondary-black text-xl font-bold">Ubicación</a>
          <select className="flex justify-between items-center self-stretch  bg-secondary-white text-secondary-gray border p-2 border-secondary-gray rounded-lg">
            <option value="default">Provincia</option>
            {professions.map((profesion, index) => (
              <option key={index} value={profesion.name_country}>
                {profesion.name_country}
              </option>
            ))}
          </select>
          <select className="flex justify-between items-center self-stretch  bg-secondary-white text-secondary-gray border p-2 border-secondary-gray rounded-lg">
            <option value="default">Ciudad</option>
            {professions.map((profesion, index) => (
              <option key={index} value={profesion.name}>
                {profesion.name}
              </option>
            ))}
          </select>
        </section>
      </nav>
    </>
  );
}