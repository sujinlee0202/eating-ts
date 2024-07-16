import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginProvider from "./context/loginContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <LoginProvider>
          <RouterProvider router={router} />
        </LoginProvider>
      </main>
    </QueryClientProvider>
  );
}

export default App;
