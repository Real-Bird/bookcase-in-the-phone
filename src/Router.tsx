import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import ErrorBoundary from "./components/ErrorBoundary";
import Bookcase from "./pages/Bookcase";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import Reader from "./pages/test";
import WebcamComponent from "./pages/test2";

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
        errorElement: <ErrorBoundary />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "search",
        element: <Search />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "search/result/:isbn",
        element: <SearchResult />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "test",
        element: <Reader />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "test2",
        element: <WebcamComponent />,
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
