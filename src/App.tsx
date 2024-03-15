import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <main className={styles.main}>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
