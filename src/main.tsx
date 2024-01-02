import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { AuthContextProvider } from "./services/context/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
