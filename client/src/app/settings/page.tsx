"use client";
import { useSession } from "next-auth/react";
import { fields, redes } from "./fields";
import InputField from "../components/auth/register/InputField";
import { useEffect, useState } from "react";
import {
  City,
  Locations,
  Province,
} from "../components/Sidebar/hooks/interfaces";
import { getCities, getProvinces } from "../api/locations";
import ComboBox from "../components/ComboBox";
import { StylesConfig } from "react-select";
import { getProfessions } from "../api/office";
import { jwtDecode } from "jwt-decode";
import InputField1 from "../components/Inputs/InputField1";

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
    borderRadius: "1.5rem",
    appearance: "none",
    width: "100%",
    height: "3rem",
  }),
};

export default function Page() {
  const { data: session, status }: any = useSession();

  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    numberPhone: "",
    offices: [],
  });

  const [comboBoxOptions, setComboBoxOptions] = useState<any>({
    provinces: [],
    cities: [],
    offices: [],
  });
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [offices, setOffices] = useState();

  useEffect(() => {
    if (session?.user?.access_token) {
      const decoded: any = jwtDecode(session.user.access_token);
      setUser((prevUser: any) => ({
        ...prevUser,
        ...decoded.user,
      }));
    }
  }, [session]);

  useEffect(() => {
    getProvinces().then((newProvinces: Province[]) => {
      setComboBoxOptions((prevState: Locations) => ({
        ...prevState,
        provinces: newProvinces,
      }));
    });
    getCities().then((newCities: City[]) => {
      setComboBoxOptions((prevState: Locations) => ({
        ...prevState,
        cities: newCities,
      }));
    });
    getProfessions().then((newOffices: any) => {
      setComboBoxOptions((prevState: any) => ({
        ...prevState,
        offices: newOffices,
      }));
    });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: value
    }));
  };


  const handleRemoveOffice = (officeId: number) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      offices: prevUser.offices.filter((office: any) => office.id !== officeId),
    }));
  };

  const handleChangeOffices = (selectedOptions: any) => {
    // Filtrar los oficios seleccionados que ya estén en el estado de usuario
    const newOffices = selectedOptions.filter(
      (option: any) =>
        !user.offices.some((office: any) => office.id === option.value)
    );

    // Actualizar el estado de oficios del usuario con los nuevos oficios seleccionados
    setUser((prevUser: any) => ({
      ...prevUser,
      offices: [
        ...prevUser.offices,
        ...newOffices.map((option: any) => ({
          id: option.value,
          name: option.label,
        })),
      ],
    }));

    // Actualizar el estado de los oficios seleccionados en el ComboBox
    setOffices(selectedOptions);
  };

  console.log(user);


  if (status === "loading") {
    return <></>;
  }

  if (status === "authenticated" && user) {
    return (
      <div className="h-screen grid grid-rows-layout grid-cols-3 gap-x-4 pb-4 md:px-4">
        {/* Navbar placeholder */}
        <div className="col-span-3 h-24 flex-shrink-0"></div>

        {/* Sidebar */}
        <div className="h-full col-span-1 pl-20 pt-16">
          <ul className="flex flex-col gap-9">
            <li><a className="cursor-pointer" href="#">Imagen de perfil y portada</a></li>
            <li><a className="cursor-pointer" href="#">Información básica</a></li>
            <li><a className="cursor-pointer" href="#">Redes de contacto</a></li>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-span-2">
          {/* Sección de selección de imagen */}
          <section className="flex flex-col gap-6 w-full pb-8 pt-20">
            <div className="w-full">
              <span className="text-xl font-bold">Imagen de Perfil</span>
              <div className="flex">
                <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15">
                  <label htmlFor="uploadProfileImg">
                    {user.photo ? (
                      <img
                        className="h-24 w-24 border-2 rounded-full border-secondary-white"
                        src={user.photo}
                        alt="Imagen de Perfil"
                      />
                    ) : (
                      <img
                        className="h-24 w-24 border-2 rounded-full border-secondary-white"
                        src="/img/png.png"
                        alt="Imagen de Perfil"
                      />
                    )}
                  </label>
                </picture>
                <label
                  className="ml-6 inline-flex items-center"
                  htmlFor="uploadProfileImg"
                >
                  <img
                    className="h-6 w-6 mr-2"
                    src="/svg/upload.svg"
                    alt="Cargar Archivo"
                  />
                  <span className="text-sm">Cargar imagen</span>
                  <input
                    className="hidden"
                    type="file"
                    name="uploadProfileImg"
                    id="uploadProfileImg"
                    placeholder=""
                  />
                </label>
              </div>
            </div>
            <div className="w-full">
              <span className="text-xl font-bold">Imagen de Portada</span>
              <div className="flex">
                <picture className="flex justify-center items-center w-72 h-32 px-24 py-5 rounded-3xl bg-secondary-gray/15">
                  <label htmlFor="uploadPortadaImg">
                    {user.photo ? (
                      <img
                        className="h-24 w-60 border-2 rounded-full border-secondary-white"
                        src={user.photo}
                        alt="Imagen de Portada"
                      />
                    ) : (
                      <img
                        className="h-24 w-60 border-2 rounded-full border-secondary-white"
                        src="/img/png.png"
                        alt="Imagen de Portada"
                      />
                    )}
                  </label>
                </picture>
                <label
                  className="ml-6 inline-flex items-center"
                  htmlFor="uploadPortadaImg"
                >
                  <img
                    className="h-6 w-6 mr-2"
                    src="/svg/upload.svg"
                    alt="Cargar Archivo"
                  />
                  <span className="text-sm">Cargar imagen</span>
                  <input
                    className="hidden"
                    type="file"
                    name="uploadPortadaImg"
                    id="uploadPortadaImg"
                    placeholder=""
                  />
                </label>
              </div>
            </div>
          </section>
          {/* Sección de selección básica */}
          <section className="flex flex-col gap-6 w-full pb-8 pt-20">
            <h2 className="text-xl font-bold">Información básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="block mb-1 ml-4 font-bold text-xl"
                  >
                    {field.label}
                  </label>
                  <InputField
                    id={field.name}
                    autoComplete={field.autoComplete}
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={user[field.name]}
                    onChange={() => { }}
                    iconSrc={field.iconSrc}
                  />
                </div>
              ))}
            </div>
            {/* Campos de selección de provincia y ciudad */}
            <div className="flex flex-wrap w-full">
              <div className="w-full md:w-1/2 md:pr-2">
                <span className="block mb-1 ml-4 font-bold text-xl">
                  Provincia
                </span>
                <ComboBox
                  optionsProps={comboBoxOptions.provinces}
                  styles={styleComboBox}
                  placeholder="Provincia"
                  selectedOptions={province}
                  setSelectedOptions={setProvince}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-2">
                <span className="block mb-1 ml-4 font-bold text-xl">
                  Ciudad
                </span>
                <ComboBox
                  optionsProps={comboBoxOptions.cities}
                  styles={styleComboBox}
                  placeholder="Ciudad"
                  selectedOptions={city}
                  setSelectedOptions={setCity}
                />
              </div>
            </div>
            {/* Campos de selección de Profesiones */}
            <div>
              <div className="w-full">
                <span className="block mb-1 ml-4 font-bold text-xl">
                  Profesión
                </span>
                <ComboBox
                  isMulti
                  optionsProps={comboBoxOptions.offices}
                  optionsToDisable={user.offices}
                  styles={styleComboBox}
                  placeholder="Oficios"
                  selectedOptions={offices}
                  setSelectedOptions={handleChangeOffices}
                />
                <div className="flex gap-2 mt-2">
                  {user.offices.map((office: any) => {
                    return (
                      <span
                        className="border text-xs text-secondary-gray rounded-full px-2 py-1 cursor-pointer"
                        key={office.id}
                        onClick={() => handleRemoveOffice(office.id)}
                      >
                        {office.name} X
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-6 w-full pb-8 pt-20">
            <h2 className="text-xl font-bold">Redes de Contacto</h2>
            {redes.map(({ name, iconSrc, label, autoComplete, type, placeholder }, index) => (
              <div key={name || index}>
                <label
                  htmlFor={name}
                  className="flex flex-col items-start mb-1 ml-4 text-base"
                >
                  <span className="flex items-center justify-center">
                    <img src={iconSrc} alt="Icon" className="h-6 w-6 mr-2 select-none" />
                    {label}
                  </span>
                </label>
                <InputField1
                  id={name}
                  autoComplete={autoComplete}
                  type={type || "text"}
                  name={name}
                  placeholder={placeholder}
                  value={user[name]}
                  iconSrc=""
                  onChange={handleChange}
                />
              </div>
            ))}
          </section>
          <section className="flex flex-col gap-6 w-full pb-8 pt-20">
            <h2 className="text-xl font-bold">Acerca de Mí</h2>
            <span className="w-full h-64 flex border border-secondary-gray rounded-3xl p-3 bg-secondary-white">
              <textarea
                className="w-full h-full focus:outline-none bg-transparent resize-none"
                autoComplete="off"
                name="about"
                placeholder="Descripción"
              />
            </span>

          </section>
        </div>
      </div>
    );
  }

  return null;
}
