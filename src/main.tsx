import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./styles/global.css";
import FetchUserDataProvider from "@libs/userContextApi";

export let inMemoryCache = { isLogged: false };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <FetchUserDataProvider>
    <RouterProvider router={router} />
  </FetchUserDataProvider>
  // </React.StrictMode>
);
