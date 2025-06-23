import { createContext } from "react";
import { UserSession } from "../../types/auth";

interface SessionContextType {
  user: UserSession | null;
  login: (userData: UserSession) => void;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);
