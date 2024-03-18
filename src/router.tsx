import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup/signup";

const routeData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export const router = createBrowserRouter(routeData);
