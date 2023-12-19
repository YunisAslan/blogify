import RootLayout from "@/pages/layouts/RootLayout";
import Login from "@/pages/login";
import News from "@/pages/news";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "news",
        element: <News />,
      },
    ],
  },
]);
