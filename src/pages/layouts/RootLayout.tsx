import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
   
  }, [])
  

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
