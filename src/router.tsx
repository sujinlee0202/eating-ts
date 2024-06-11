import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import Detail from "./pages/Detail";
import HomeTab from "./pages/Detail/HomeTab.tsx";
import ReviewTab from "./pages/Detail/ReviewTab.tsx";
import PhotoTab from "./pages/Detail/PhotoTab.tsx";
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
