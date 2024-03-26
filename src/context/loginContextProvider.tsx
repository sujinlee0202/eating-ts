import { useEffect, useState } from "react";
import { onAuthStateChange } from "../api/firebase/auth";
import { FirebaseUser } from "../types/FirebaseUser";
import { loginContext } from "./loginContext";

interface Props {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    onAuthStateChange((authUser) => {
      setUser(authUser);
    });
  }, []);

  return (
    <loginContext.Provider value={{ user, setUser }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
