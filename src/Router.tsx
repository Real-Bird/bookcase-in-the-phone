import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
