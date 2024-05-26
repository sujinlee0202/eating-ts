import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import AddPlace from "./pages/AddPlace/addplace";
import Detail from "./pages/Detail/detail";

const routeData = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/place/:placeId",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addplace",
    element: <AddPlace />,
  },
];

export const router = createBrowserRouter(routeData);
