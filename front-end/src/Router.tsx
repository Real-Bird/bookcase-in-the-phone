import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@components/common";

import {
  About,
  Bookcase,
  BookDetail,
  Login,
  NotFound,
  Search,
  SearchResult,
} from "./pages";
import Root from "./Root";
import IsbnSearch from "@containers/search/IsbnSearch";
import CameraSearch from "@containers/search/CameraSearch";
import { hasUserToken } from "@api/auth";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: (
            <RequireAuth>
              <Bookcase />
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "books/:title",
          element: <BookDetail />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "about",
          element: (
            <RequireAuth>
              <About />
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "login",
          element: (
            <AlreadyAuth>
              <Login />
            </AlreadyAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "search",
          element: (
            <RequireAuth>
              <Search />
            </RequireAuth>
          ),
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
      ],
      errorElement: <NotFound />,
    },
  ],
  { basename: "/" }
);

export default router;

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = hasUserToken("BiPToken");
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AlreadyAuth({ children }: { children: JSX.Element }) {
  const auth = hasUserToken("BiPToken");
  const location = useLocation();

  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
