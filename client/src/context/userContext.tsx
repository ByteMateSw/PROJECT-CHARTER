"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type UserContextType = [any | null, Dispatch<SetStateAction<any | null>>];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
