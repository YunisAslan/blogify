import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./services/context/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
);
