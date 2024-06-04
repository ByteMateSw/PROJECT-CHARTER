import { Field } from "./interfaces";

export const fields: Field[] = [
  {
    name: "firstName",
    label: "Nombre",
    placeholder: "Nombre",
    iconSrc: "/svg/person.svg",
    autoComplete: "off",
  },
  {
    name: "lastName",
    label: "Apellido",
    placeholder: "Apellido",
    iconSrc: "/svg/person.svg",
    autoComplete: "off",
  },
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "correo@correo.com",
    iconSrc: "/svg/Mail-Icon.svg",
    autoComplete: "off",
  },
  {
    name: "username",
    label: "Nombre de Usuario",
    placeholder: "Nombre de Usuario",
    iconSrc: "/svg/person.svg",
    autoComplete: "off",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "····················",
    iconSrc: "/svg/Lock-Icon.svg",
    type: "password",
    autoComplete: "off",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Contraseña",
    placeholder: "····················",
    iconSrc: "/svg/Lock-Icon.svg",
    type: "password",
    autoComplete: "on",
  },
];

export const fields2: Field[] = [
  {
    name: "dni",
    label: "DNI",
    placeholder: "xxxxxxxx",
    iconSrc: "/svg/person.svg",
    autoComplete: "off",
  },
  {
    name: "numberPhone",
    label: "Celular",
    placeholder: "Celular",
    iconSrc: "/svg/cell-phone.svg",
    autoComplete: "off",
  },
];

export const fields3: Field[] = [
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "correo@correo.com",
    iconSrc: "/svg/Mail-Icon.svg",
    autoComplete: "on",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "····················",
    iconSrc: "/svg/Lock-Icon.svg",
    type: "password",
    autoComplete: "on",
  },
];
