import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster";
import { routes } from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
