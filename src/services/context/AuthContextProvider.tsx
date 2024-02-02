import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPublisherByID, getUserByID } from "../api/auth";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

type AuthContextType = [
  Publisher | User | undefined,
  Dispatch<SetStateAction<Publisher | User | undefined>>
];

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { toast } = useToast();

  const [account, setAccount] = useState<Publisher | User | undefined>(
    undefined
  );
  const token = Cookies.get("token");

  useEffect(() => {
    async function loadData() {
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);

          const publisher = await getPublisherByID(decoded.id);
          const user = await getUserByID(decoded.id);

          if (publisher) {
            setAccount(publisher.data);
          } else if (user) {
            setAccount(user.data);
          }
        } catch (err) {
          console.error(err);
          toast({
            title: "Error decoding token!",
            variant: "destructive",
          });
        }
      }
    }

    loadData();
  }, [token, setAccount]);

  return (
    <AuthContext.Provider value={[account, setAccount]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("failed!");
  }

  return context;
};
