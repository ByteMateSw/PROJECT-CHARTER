import { Dispatch, SetStateAction } from "react";

export interface City {
  id: number;
  name: string;
}

export interface Province {
  id: number;
  name: string;
  cities?: City[];
}

export interface Locations {
  provinces: Province[];
  cities: City[];
}

export interface Profession {
  id: number;
  name: string;
}

export type CheckedItems = { [key: number]: boolean };

export interface SidebarEffectsArgs {
  setLocations: Dispatch<SetStateAction<Locations | undefined>>;
  selectedProfessions: string[];
  setSelectedProfessions: Dispatch<SetStateAction<string[]>>;
  professions: Profession[];
  setProfessions: Dispatch<SetStateAction<Profession[]>>;
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>;
}

export interface SidebarEventsArgs {
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>;
  setSelectedProfessions: Dispatch<SetStateAction<string[]>>;
  professions: Profession[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
}
