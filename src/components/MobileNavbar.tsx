import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  LogOutIcon,
  Search,
  Twitter,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  account?: Publisher | User;
}

function MobileNavbar({
  isOpen,
  setIsOpen,
  account,
  handleLogout,
}: MobileNavbarProps) {
  return (
    <div className="relative mx-2 lg:hidden">
      <div
        className={cn(
          "bg-gray-100 absolute w-full overflow-hidden h-0 transition-all ease-easeInOutQuart duration-500",
          isOpen && "h-64"
        )}
      >
        <div className="px-2">
          <div className="py-2 flex flex-col items-start font-oswald">
            <Link
              to="/"
              className="uppercase text-lg px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/news"
              className="uppercase text-lg px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>

            <Link
              to="/publishers"
              className="uppercase text-lg px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Publishers
            </Link>

            {!account?._id && (
              <Link
                to="/login"
                className="uppercase text-lg px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            )}

            {account?.type === "publisher" && (
              <Link
                to="/write"
                className="uppercase text-lg px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Write
              </Link>
            )}
          </div>

          <div className="py-10 pl-2 flex justify-start items-center gap-x-4">
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
    </div>
  );
}

export default MobileNavbar;
