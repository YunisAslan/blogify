import { logOut } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useToast } from "@/hooks/use-toast";
import {
  Facebook,
  Linkedin,
  LogOutIcon,
  Search,
  Twitter,
  Youtube,
} from "lucide-react";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getPublisherByID, getUserByID } from "@/services/api/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<User | Publisher | null>(null);
  const account = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    async function loadData() {
      if (account?.type === "user") {
        const user = await getUserByID(account.id);
        setCurrentUser(user.data);
      }

      if (account?.type === "publisher") {
        const publisher = await getPublisherByID(account.id);
        setCurrentUser(publisher.data);
      }
    }

    loadData();
  }, []);

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/login");

    toast({
      title: "Successfully logged out!",
    });
  };

  console.log("CurrentUser", currentUser);
  

  return (
    <nav className="w-full px-2 sticky top-0 z-10">
      <div className="container">
        <div className="bg-white max-w-[1100px] h-[108px] mx-auto flex items-end justify-between py-2 border-b-2 border-black">
          <div className="font-oswald">
            <Link to="/" className="uppercase text-lg px-2 py-1">
              Home
            </Link>

            <Link to="/news" className="uppercase text-lg px-2 py-1">
              News
            </Link>

            <Link to="/publishers" className="uppercase text-lg px-2 py-1">
            Publishers
            </Link>

            {!account?.id && (
              <Link to="/login" className="uppercase text-lg px-2 py-1">
                Sign in
              </Link>
            )}

            {account?.type === "publisher" && (
              <Link to="/write" className="uppercase text-lg px-2 py-1">
                Write
              </Link>
            )}
          </div>

          <Link to="/" className=" absolute left-[calc(50%-45px)]">
            <div className="w-[90px]">
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
              <Facebook className="w-5 h-5" />
            </Link>

            <Link to="/face">
              <Linkedin className="w-5 h-5" />
            </Link>

            <Link to="/face">
              <Twitter className="w-5 h-5" />
            </Link>

            <Link to="/face">
              <Youtube className="w-5 h-5" />
            </Link>

            <Link to="/face">
              <Search className="w-5 h-5" />
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
