import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/home.tsx";
import Signup from "./Pages/Signup/signup.tsx";
import Login from "./Pages/Login/login.tsx";
import AddPlace from "./Pages/AddPlace/addplace.tsx";
import Detail from "./Pages/Detail/detail.tsx";
import HomeTab from "./Pages/Detail/HomeTab.tsx";
import ReviewTab from "./Pages/Detail/ReviewTab.tsx";
import PhotoTab from "./Pages/Detail/PhotoTab.tsx";
import LoginLayout from "./layout/LoginLayout.tsx";

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
    element: (
      <LoginLayout requireAdmin={true}>
        <AddPlace />
      </LoginLayout>
    ),
  },
];

export const router = createBrowserRouter(routeData);
