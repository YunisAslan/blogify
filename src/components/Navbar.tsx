import { cn } from "@/lib/utils";
import { logOut } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/login")
  };

  return (
    <nav className="w-full px-2 py-2 bg-blue-950 text-white">
      <div className="container">
        <div className="flex items-center justify-between py-2 px-6">
          <div>
            <h1 className="text-3xl font-bold">
              <Link to="/news">Blogify</Link>
            </h1>
          </div>

          <div className="flex items-center gap-x-4">
            <Link
              to="/news"
              className={cn(
                "px-2 py-1 rounded duration-150 transition-colors hover:bg-gray-500",
                location.pathname === "/news" && "bg-gray-500"
              )}
            >
              News
            </Link>
            <Link
              to="/publishers"
              className={cn(
                "px-2 py-1 rounded duration-150 transition-colors hover:bg-gray-500",
                location.pathname === "/publishers" && "bg-gray-500"
              )}
            >
              Publishers
            </Link>

            <Button size="sm" variant="secondary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
