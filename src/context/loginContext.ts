import { createContext } from "react";
import { User } from "firebase/auth";

interface LoginContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  parsedSessionStorageUser: User | null;
}

export const loginContext = createContext<LoginContextType>({
  user: null,
  setUser: () => {},
  parsedSessionStorageUser: null,
});
