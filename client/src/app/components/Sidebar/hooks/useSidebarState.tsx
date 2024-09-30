import { useState } from "react";
import { CheckedItems, Locations, Profession } from "./interfaces";
import { initialLocationsState, initialProfessionsState } from "./initialStates";

export const useSidebarState = () => {
  const [locations, setLocations] = useState<Locations | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [professions, setProfessions] = useState<Profession[]>(initialProfessionsState);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>([]);
  const [selectProvince, setSelectProvince] = useState<any>()
  const [selectCities, setSelectCities] = useState<any>()
  
  return {
    locations,
    setLocations,
    setSelectProvince,
    setSelectCities,
    selectCities,
    selectProvince,
    searchTerm,
    setSearchTerm,
    selectedProfessions,
    setSelectedProfessions,
    professions,
    setProfessions,
    checkedItems,
    setCheckedItems,
  };
};
