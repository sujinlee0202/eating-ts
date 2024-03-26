import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";

const routeData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

export const router = createBrowserRouter(routeData);
