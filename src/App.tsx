import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import LoginProvider from "./context/loginContextProvider";

function App() {
  return (
    <main className={styles.main}>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </main>
  );
}

export default App;
