import Root from "@/Root";
import { FetchUserDataProvider } from "@libs/userContextApi";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FetchUserDataProvider>
      <RouterProvider router={router} />
    </FetchUserDataProvider>
  </React.StrictMode>
);
