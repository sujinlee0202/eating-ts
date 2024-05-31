import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import AddPlace from "./pages/AddPlace/addplace";
import Detail from "./pages/Detail/detail";
import HomeTab from "./pages/Detail/HomeTab";
import ReviewTab from "./pages/Detail/ReviewTab";
import PhotoTab from "./pages/Detail/PhotoTab.tsx";

const routeData = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/place/:placeId",
        element: <Detail />,
        children: [
          {
            path: "",
            element: <HomeTab />,
          },
          {
            path: "home",
            element: <HomeTab />,
          },
          {
            path: "review",
            element: <ReviewTab />,
          },
          {
            path: "photo",
            element: <PhotoTab />,
          },
        ],
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
