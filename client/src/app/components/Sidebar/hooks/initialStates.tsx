import { Locations, Profession } from "./interfaces";

export const initialLocationsState: Locations = {
  provinces: [
    {
      id: 1,
      name: "Buenos Aires",
      cities: [
        { id: 1, name: "La Plata" },
        { id: 2, name: "Mar del Plata" },
      ],
    },
  ],
  cities: [
    { id: 1, name: "La Plata" },
    { id: 2, name: "Mar del Plata" },
  ],
};

export const initialProfessionsState: Profession[] = [
  { id: 1, name: "Programador" },
];
