import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./styles/global.css";

export const inMemoryCache: InMemoryCache = {};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

type PathCache = Record<string, { expired: number }>;
interface InMemoryCache {
  isNonLogged?: boolean;
  pathCache?: PathCache;
}
