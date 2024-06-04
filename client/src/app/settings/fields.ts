import { Field } from "../auth/register/interfaces";

export const fields: Field[] = [
  {
    name: "firstName",
    label: "Nombre",
    placeholder: "Nombre",
    iconSrc: "",
    autoComplete: "off",
  },
  {
    name: "lastName",
    label: "Apellido",
    placeholder: "Apellido",
    iconSrc: "",
    autoComplete: "off",
  },
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "correo@correo.com",
    iconSrc: "",
    autoComplete: "on",
  },
  {
    name: "userName",
    label: "Nombre de Usuario",
    placeholder: "Nombre de Usuario",
    iconSrc: "",
    autoComplete: "off",
  },
];

export const redes: Field[] = [
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "Link del perfil",
    iconSrc: "/svg/instagram-icon.svg",
    autoComplete: "off",
  },
  {
    name: "twitter",
    label: "Twitter (X)",
    placeholder: "Link del perfil",
    iconSrc: "/svg/twitter-x-icon.svg",
    autoComplete: "off",
  },
  {
    name: "facebook",
    label: "Facebook",
    placeholder: "Link del perfil",
    iconSrc: "/svg/facebook-icon.svg",
    autoComplete: "off",
  },
  {
    name: "instagram",
    label: "LinkedIn",
    placeholder: "Link del perfil",
    iconSrc: "/svg/linkedin-icon.svg",
    autoComplete: "off",
  },
];
