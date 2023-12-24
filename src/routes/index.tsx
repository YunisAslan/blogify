import NotFound from "@/components/NotFound";
import Home from "@/pages/home";
import RootLayout from "@/pages/layouts/RootLayout";
import Login from "@/pages/login";
import News from "@/pages/news";
import Register from "@/pages/register";
import Write from "@/pages/write";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
      {
        path: "write",
        element: <Write />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
