"use client";
import React, { use, useState, useEffect } from "react";
import { professions } from "@/json/professions";
import Image from "next/image";

export default function Sidebar(): JSX.Element {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const measure = 24;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  interface User {
    id: number;
    name: string;
  }
  const URL = "http://localhost:3001/offices";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    showData();
  }, []);

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
      <nav className="flex h-full w-80 p-6 flex-col items-start flex-1 border rounded-3xl border-secondary-gray overflow-y-hidden">
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

        <ul className="overflow-y-scroll w-full mt-6">
          {users
            .filter((users) =>
              users.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, id) => {
              return (
                <li
                  key={id}
                  className="flex items-center py-1 w-fit"
                  onClick={() => handleCheckboxChange(id)}
                >
                  <input
                    className={`ml-2 rounded-full appearance-none w-2 h-2 ring-2 ring-offset-2 ring-secondary-black items-center justify-center ${
                      checkedItems[id]
                        ? " bg-primary-blue ring-2"
                        : "bg-secondary-white"
                    }`}
                    id={`${id}`}
                    type="checkbox"
                    checked={checkedItems[id] || false}
                  />
                  <label className="text-neutral-900 text-base ml-2">
                    {user.name}
                  </label>
                </li>
              );
            })}
        </ul>
        <hr className="w-full mt-6" />
        <section className="w-full flex flex-col flex-1 justify-end items-start py-6 gap-4">
          <div className="flex">
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
          <select className="flex justify-between items-center self-stretch  bg-secondary-white text-secondary-gray border p-2 border-secondary-gray rounded-2xl appearance-none">
            <option value="default">Provincia</option>
            {professions.map((profesion, id) => (
              <option key={id} value={profesion.name_country}>
                {profesion.name_country}
              </option>
            ))}
          </select>
          <select className="flex justify-between items-center self-stretch  bg-secondary-white text-secondary-gray border p-2 border-secondary-gray rounded-2xl appearance-none">
            <option value="default">Ciudad</option>
            {professions.map((profesion, id) => (
              <option key={id} value={profesion.name}>
                {profesion.name}
              </option>
            ))}
          </select>
        </section>
      </nav>
    </>
  );
}
