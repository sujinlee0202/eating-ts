import { createContext } from "react";
import { FirebaseUser } from "../types/FIrebaseUser";

interface LoginContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

export const loginContext = createContext<LoginContextType>({
  user: null,
  setUser: () => {},
});
