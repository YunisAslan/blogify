import { logOut } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useToast } from "@/hooks/use-toast";
import {
  AlignJustify as BarsIcon,
  Facebook,
  Linkedin,
  LogOutIcon,
  Search,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getPublisherByID, getUserByID } from "@/services/api/auth";
import { Button } from "./ui/Button";
import MobileNavbar from "./MobileNavbar";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<User | Publisher | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <nav className="w-full px-2 sticky top-0 z-10">
      <div className="px-2 lg:container">
        <div className="relative bg-white max-w-[1100px] 2xl:max-w-[1200px] h-20 lg:h-[108px] mx-auto flex items-center lg:items-end justify-between py-1 border-b-2 border-black">
          <div className="hidden lg:inline-block font-oswald">
            <Link
              to="/"
              className="inline-block uppercase text-lg px-2 hover:scale-110 transition-all duration-500"
            >
              Home
            </Link>

            <Link
              to="/news"
              className="inline-block uppercase text-lg px-2 hover:scale-110 transition-all duration-500"
            >
              News
            </Link>

            <Link
              to="/publishers"
              className="inline-block uppercase text-lg px-2 hover:scale-110 transition-all duration-500"
            >
              Publishers
            </Link>

            {!account?.id && (
              <Link
                to="/login"
                className="uppercase text-lg px-2 hover:scale-110 transition-all duration-500"
              >
                Sign in
              </Link>
            )}

            {account?.type === "publisher" && (
              <Link
                to="/write"
                className="uppercase text-lg px-2 hover:scale-110 transition-all duration-500"
              >
                Write
              </Link>
            )}
          </div>

          <Link
            to="/"
            className="absolute left-[calc(50%-45px)] hidden lg:flex"
          >
            <div className="w-11 lg:w-[90px]">
              <img src={Logo} alt="" className="w-full h-full" />
            </div>
          </Link>

          <div className="hidden lg:flex justify-center items-center gap-x-4">
            <Link
              to="/facebook"
              className="inline-block hover:scale-110 transition-all duration-500"
            >
              <Facebook className="w-5 h-5" />
            </Link>

            <Link
              to="/instagram"
              className="inline-block hover:scale-110 transition-all duration-500"
            >
              <Linkedin className="w-5 h-5" />
            </Link>

            <Link
              to="/twitter"
              className="inline-block hover:scale-110 transition-all duration-500"
            >
              <Twitter className="w-5 h-5" />
            </Link>

            <Link
              to="/youtube"
              className="inline-block hover:scale-110 transition-all duration-500"
            >
              <Youtube className="w-5 h-5" />
            </Link>

            <Link
              to="/search"
              className="inline-block hover:scale-110 transition-all duration-500"
            >
              <Search className="w-5 h-5" />
            </Link>

            {account && (
              <button onClick={handleLogout} className="inline-block hover:scale-110 transition-all duration-500">
                <LogOutIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* mobile design */}
          <div className="w-full px-2 flex items-center justify-between lg:hidden">
            <Link to="/" className="">
              <div className="w-11 lg:w-[90px]">
                <img src={Logo} alt="" className="w-full h-full" />
              </div>
            </Link>

            {isOpen ? (
              <Button
                variant="ghost"
                size="icon"
                className="flex hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="flex hover:bg-transparent"
                onClick={() => setIsOpen(true)}
              >
                <BarsIcon />
              </Button>
            )}
          </div>
        </div>
      </div>

      <MobileNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        account={account}
        handleLogout={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
