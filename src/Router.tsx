import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import ErrorBoundary from "./components/ErrorBoundary";
import Bookcase from "./pages/Bookcase";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Bookcase />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "books/:title",
        element: <BookDetail />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
