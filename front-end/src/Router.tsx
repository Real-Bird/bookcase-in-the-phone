import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { ErrorBoundary, PageLoading } from "@components/common";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import IsbnSearch from "@containers/search/IsbnSearch";
import CameraSearch from "@containers/search/CameraSearch";
import { hasUserToken } from "@api/auth";
import Test from "pages/Test";

const Bookcase = lazy(() => import("./pages/Bookcase"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const BookDetailEdit = lazy(() => import("./pages/BookDetailEdit"));
const Login = lazy(() => import("./pages/Login"));
const Search = lazy(() => import("./pages/Search"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const About = lazy(() => import("./pages/About"));

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
              <Suspense fallback={<PageLoading />}>
                <Bookcase />
              </Suspense>
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/test",
          element: <Test />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "books/:isbn",
          element: (
            <Suspense fallback={<PageLoading />}>
              <BookDetail />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "books/:isbn/edit",
          element: (
            <Suspense fallback={<PageLoading />}>
              <BookDetailEdit />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "about",
          element: (
            <RequireAuth>
              <Suspense fallback={<PageLoading />}>
                <About />
              </Suspense>
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "login",
          element: (
            <AlreadyAuth>
              <Suspense fallback={<PageLoading />}>
                <Login />
              </Suspense>
            </AlreadyAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "search",
          element: (
            <RequireAuth>
              <Suspense fallback={<PageLoading />}>
                <Search />
              </Suspense>
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: "camera",
              element: (
                <Suspense fallback={<PageLoading />}>
                  <CameraSearch />
                </Suspense>
              ),
              errorElement: <NotFound />,
            },
            {
              path: "isbn",
              element: (
                <Suspense fallback={<PageLoading />}>
                  <IsbnSearch />
                </Suspense>
              ),
              errorElement: <NotFound />,
            },
          ],
        },
        {
          path: "result/:isbn",
          element: (
            <Suspense fallback={<PageLoading />}>
              <SearchResult />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: "/404",
      element: <NotFound />,
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
