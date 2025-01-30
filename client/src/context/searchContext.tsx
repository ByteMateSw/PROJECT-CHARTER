"use client";

import { createContext, useContext, useState, useReducer, ReactNode, Dispatch, SetStateAction } from "react";

// type SearchContextType = [any | null, Dispatch<SetStateAction<any | null>>];

type statetype = {
    search: string;
    city: string;
}

const initialState: statetype = {
    search: '',
    city: ''
}

const SearchContext = createContext<any>(undefined);

export function SearchProvider({children}: {children: ReactNode}) {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('')
    const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);

    return <SearchContext.Provider value={{search, city, selectedProfessions, setSearch, setCity, setSelectedProfessions}}>{children}</SearchContext.Provider>
}

export const useFilter = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
  