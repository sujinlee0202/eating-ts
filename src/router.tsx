import { createBrowserRouter } from "react-router-dom";

import Detail from "./pages/Detail";
import HomeTab from "./pages/Detail/HomeTab";
import PhotoTab from "./pages/Detail/PhotoTab";
import ReviewTab from "./pages/Detail/ReviewTab";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginLayout from "./layout/LoginLayout";
import Addplace from "./pages/AddPlace";

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
        <Addplace />
      </LoginLayout>
    ),
  },
];

export const router = createBrowserRouter(routeData);
