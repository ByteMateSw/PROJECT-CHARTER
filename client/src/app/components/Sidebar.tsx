"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ComboBox from "./ComboBox";
import { provincesBox } from "@/json/provincesBox";
import { locationsBox } from "@/json/locations";
import { getProfessions } from "../api/office";
import { StylesConfig } from "react-select";
import { getCities, getProvinces } from "../api/locations";
        
interface Profession {
  id: number;
  name: string;
}

export default function Sidebar(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const professionsParams = searchParams.get("professions");
  const [locations, setLocations] = useState<{ provinces: any; cities: any }>({
    provinces: null,
    cities: null,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProfessions, setSelectedProfessions] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    []
  );
  const measure = 24;

  // Fetch data
  useEffect(() => {
    getProvinces().then((newProvinces: any) => {
      setLocations((prevState) => ({ ...prevState, provinces: newProvinces }));
    });
    getCities().then((newCities: any) => {
      setLocations((prevState) => ({ ...prevState, cities: newCities }));
    });
  }, []);

  // Actualizar selectedProfessions cuando cambia professionsParams
  useEffect(() => {
    if (professionsParams) setSelectedProfessions(professionsParams.split("-"));
  }, [professionsParams]);

  // Actualizar la URL cuando cambia selectedProfessions
  useEffect(() => {
    if (selectedProfessions.length === 0) router.replace("/dashboard/hire");
    else router.push(`?professions=${selectedProfessions.join("-")}`);
  }, [selectedProfessions, router]);

  useEffect(() => {
    const newCheckedItems = selectedProfessions.reduce((acc, curr) => {
      const index = professions.findIndex(
        (profession) => profession.name === curr
      );
      return { ...acc, [index]: true };
    }, {});
    setCheckedItems(newCheckedItems);
  }, [selectedProfessions]);

  // Styles
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
  const [professions, setProfessions] = useState<Profession[]>([
    { id: 1, name: "Ingeniero" },
  ]);

  useEffect(() => {
    getProfessions().then((data: Profession[]) => {
      setProfessions(data);
    });
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

    setSelectedProfessions((prevSelectedProfessions) => {
      const updatedSelectedProfessions = [...prevSelectedProfessions];

      if (updatedSelectedProfessions.includes(professions[index].name)) {
        updatedSelectedProfessions.splice(
          updatedSelectedProfessions.indexOf(professions[index].name),
          1
        );
      } else {
        updatedSelectedProfessions.push(professions[index].name);
      }
      return updatedSelectedProfessions;
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
            optionsProps={locations.provinces}
            placeholder="Provincia"
            styles={styleComboBox}
          />
          <ComboBox
            optionsProps={locations.cities}
            placeholder="Localidades"
            styles={styleComboBox}
          />
        </section>
      </nav>
    </>
  );
}
