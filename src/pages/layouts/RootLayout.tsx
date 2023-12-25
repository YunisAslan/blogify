import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
  // const navigate = useNavigate();
  // const { toast } = useToast();
  const location = useLocation();
  // const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // if (!user?.id && location.pathname !== "/register") {
    //   navigate("/login");

    //   setTimeout(() => {
    //     toast({
    //       title: "You must be login",
    //       variant: "destructive",
    //     });
    //   }, 0);
    // }

    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <main className="max-w-[1100px] mx-auto min-h-screen py-2 px-4 lg:px-0">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
