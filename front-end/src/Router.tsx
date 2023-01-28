import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@components/common";

import {
  About,
  APITest,
  Bookcase,
  BookDetail,
  Login,
  NotFound,
  Search,
  SearchResult,
} from "@/pages";
import Root from "@/Root";
import IsbnSearch from "@/containers/search/IsbnSearch";
import CameraSearch from "@/containers/search/CameraSearch";

const router = createBrowserRouter(
  [
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
          children: [
            {
              path: "camera",
              element: <CameraSearch />,
              errorElement: <NotFound />,
            },
            {
              path: "isbn",
              element: <IsbnSearch />,
              errorElement: <NotFound />,
            },
          ],
        },
        {
          path: "result/:isbn",
          element: <SearchResult />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "test",
          element: <APITest />,
          errorElement: <ErrorBoundary />,
        },
      ],
      errorElement: <NotFound />,
    },
  ],
  { basename: "/" }
);

export default router;
