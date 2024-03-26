import { createContext } from "react";
import { FirebaseUser } from "../types/FirebaseUser";

interface LoginContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

export const loginContext = createContext<LoginContextType>({
  user: null,
  setUser: () => {},
});
