import { logOut } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Linkedin, LogOutIcon, Search, Twitter, Youtube } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/login");

    toast({
      title: "Successfully logged out!",
    });
  };

  return (
    <nav className="w-full px-2 py-2 sticky top-0 z-10">
      <div className="container">
        <div className="bg-white max-w-6xl mx-auto flex items-end justify-between py-2 px-4 border-b-2 border-black">
          
          <div className="font-oswald">
            <Link
              to="/news"
              className="uppercase text-lg px-2 py-1"
            >
              News
            </Link>

            <Link
              to="/about"
              className="uppercase text-lg px-2 py-1"
            >
              About
            </Link>

            <Link
              to="/authors"
              className="uppercase text-lg px-2 py-1"
            >
              Authors
            </Link>

            <Link
              to="/contact"
              className="uppercase text-lg px-2 py-1"
            >
              Contact
            </Link>
          </div>

          <Link to="/news">
            <div className="w-24">
              <img src={Logo} alt="" className="w-full h-full" />
            </div>
          </Link>

          <div className="flex justify-center items-center gap-x-4">
            {/* <Link
              to="/news"
              className={cn(
                "px-2 py-1 rounded duration-150 transition-colors hover:bg-gray-500",
                location.pathname === "/news" && "bg-gray-500"
              )}
            >
              News
            </Link> */}

            <Link to="/face">
              <Facebook className="w-5 h-5"/>
            </Link>

            <Link to="/face">
              <Linkedin className="w-5 h-5"/>
            </Link>

            <Link to="/face">
              <Twitter className="w-5 h-5"/>
            </Link>

            <Link to="/face">
              <Youtube className="w-5 h-5"/>
            </Link>

            <Link to="/face">
              <Search className="w-5 h-5"/>
            </Link>

            <button onClick={handleLogout}>
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
