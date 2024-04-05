import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import AddPlace from "./pages/AddPlace/addplace";

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
  {
    path: "addplace",
    element: <AddPlace />,
  },
];

export const router = createBrowserRouter(routeData);
