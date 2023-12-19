import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <main className="max-w-7xl mx-auto min-h-screen py-2">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
