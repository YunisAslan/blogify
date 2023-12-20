import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function RootLayout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);

      useEffect(() => {
        if (!user?.id && location.pathname !== "/register") {
          navigate("/login");

          setTimeout(() => {
            toast({
              title: "You must be login",
              variant: "destructive",
            });
          }, 0);
        }
      }, []);

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
