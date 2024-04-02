"use client";
import { useState } from "react";
import { professions } from "@/json/professions";
import Image from "next/image";
import ComboBox from "./ComboBox";
import { provincesBox } from "@/json/provincesBox";
import { locationsBox } from "@/json/locations";

export default function Sidebar(): JSX.Element {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const measure = 24;
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [users, setUsers] = useState<User[]>([]);
  // interface User {
  //   id: number;
  //   name: string;
  // }
  // const URL = "http://localhost:3001/offices";

  // const showData = async () => {
  //   const response = await fetch(URL);
  //   const data = await response.json();
  //   setUsers(data);
  // };

  // useEffect(() => {
  //   showData();
  // }, []);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };

      if (updatedCheckedItems[id]) {
        delete updatedCheckedItems[id];
      } else {
        updatedCheckedItems[id] = true;
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
            .map((user, index) => {
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
                    {user.name}
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
          <ComboBox optionsProps={provincesBox} placeholder="Provincia" />
          <ComboBox optionsProps={locationsBox} placeholder="Localidades" />
        </section>
      </nav>
    </>
  );
}