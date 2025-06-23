import { useState, ReactNode } from "react";

import { SessionContext } from "./context";
import { UserSession } from "../../types/auth";
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const storedUser = localStorage.getItem("session");
      if (storedUser == null) return null;

      const lastTokenUsed = localStorage.getItem("last_token_used");
      if (lastTokenUsed != null) {
        const savedDate = new Date(lastTokenUsed);
        const currentDate = new Date();

        if (!isNaN(savedDate.getTime())) {
          const timeDifference = currentDate.getTime() - savedDate.getTime();
          if (timeDifference > 5 * 60 * 60 * 1000) {
            localStorage.removeItem("session");
            return null;
          }
        }
      }

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error retrieving session data from localStorage", error);
      return null;
    }
  });

  const login = (userData: UserSession) => {
    setUser(userData);
    const currentDate = new Date();
    localStorage.setItem("last_token_used", currentDate.toISOString());
    localStorage.setItem("session", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
