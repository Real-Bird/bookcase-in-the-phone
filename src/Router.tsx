import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@components/common";

import {
  About,
  Bookcase,
  BookDetail,
  Login,
  NotFound,
  Search,
  SearchResult,
} from "@/pages";
import Root from "@/Root";

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
        path: "result/:isbn",
        element: <SearchResult />,
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
