import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { ErrorBoundary, Layout, PageLoading } from "@components/common";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import IsbnSearch from "@containers/search/IsbnSearch";
import CameraSearch from "@containers/search/CameraSearch";
import { hasUserToken } from "@api/auth";

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
              <Suspense
                fallback={
                  <Layout title="Loading">
                    <PageLoading />
                  </Layout>
                }
              >
                <Bookcase />
              </Suspense>
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "books/:isbn",
          element: (
            <Suspense
              fallback={
                <Layout title="Loading">
                  <PageLoading />
                </Layout>
              }
            >
              <BookDetail />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "books/:isbn/edit",
          element: (
            <Suspense
              fallback={
                <Layout title="Loading">
                  <PageLoading />
                </Layout>
              }
            >
              <BookDetailEdit />
            </Suspense>
          ),
          errorElement: <ErrorBoundary />,
        },
        {
          path: "about",
          element: (
            <RequireAuth>
              <Suspense
                fallback={
                  <Layout title="Loading">
                    <PageLoading />
                  </Layout>
                }
              >
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
              <Suspense
                fallback={
                  <Layout title="Loading">
                    <PageLoading />
                  </Layout>
                }
              >
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
              <Suspense
                fallback={
                  <Layout title="Loading">
                    <PageLoading />
                  </Layout>
                }
              >
                <Search />
              </Suspense>
            </RequireAuth>
          ),
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: "camera",
              element: (
                <Suspense
                  fallback={
                    <Layout title="Loading">
                      <PageLoading />
                    </Layout>
                  }
                >
                  <CameraSearch />
                </Suspense>
              ),
              errorElement: <NotFound />,
            },
            {
              path: "isbn",
              element: (
                <Suspense
                  fallback={
                    <Layout title="Loading">
                      <PageLoading />
                    </Layout>
                  }
                >
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
            <Suspense
              fallback={
                <Layout title="Loading">
                  <PageLoading />
                </Layout>
              }
            >
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
