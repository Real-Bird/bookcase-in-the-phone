import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ErrorBoundary, PageLoading } from "@components/common";
import { lazy, ReactNode, Suspense } from "react";
import { AuthGuard } from "@components/common";
import NotFound from "./pages/NotFound";
import Root from "./Root";
import CameraSearch from "@containers/search/CameraSearch";
import IsbnSearch from "@containers/search/IsbnSearch";

const Bookcase = lazy(() => import("./pages/Bookcase"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const BookDetailEdit = lazy(() => import("./pages/BookDetailEdit"));
const Login = lazy(() => import("./pages/Login"));
const Search = lazy(() => import("./pages/Search"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const About = lazy(() => import("./pages/About"));

const makeRoutes = (routeDeps: Route[]): RouteObject[] => {
  return routeDeps?.map((route) => {
    const routeObj: RouteObject = {
      path: route.pathname,
      element: !route.isNoneAuth ? (
        <AuthGuard>
          <Suspense fallback={<PageLoading />}>{route.element}</Suspense>
        </AuthGuard>
      ) : (
        route.element
      ),
      errorElement: route.isErrorBoundary ? <ErrorBoundary /> : <NotFound />,
    };
    return route.children
      ? { ...routeObj, children: makeRoutes(route.children) }
      : routeObj;
  });
};

const routeDeps: Route[] = [
  {
    pathname: "",
    element: <Bookcase />,
    isErrorBoundary: true,
  },
  {
    pathname: "books/:isbn",
    element: <BookDetail />,
    isErrorBoundary: true,
  },
  {
    pathname: "books/:isbn/edit",
    element: <BookDetailEdit />,
    isErrorBoundary: true,
  },
  {
    pathname: "about",
    element: <About />,
    isErrorBoundary: true,
  },
  {
    pathname: "login",
    element: <Login />,
    isErrorBoundary: true,
  },
  {
    pathname: "search",
    element: <Search />,
    isErrorBoundary: true,
    children: [
      {
        pathname: "camera",
        element: <CameraSearch />,
        isNoneAuth: true,
      },
      {
        pathname: "isbn",
        element: <IsbnSearch />,
        isNoneAuth: true,
      },
    ],
  },
  {
    pathname: "result/:isbn",
    element: <SearchResult />,
    isErrorBoundary: true,
  },
];

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Root />,
      children: makeRoutes(routeDeps),
      errorElement: <NotFound />,
    },
    {
      path: "404",
      element: <NotFound />,
    },
  ],
  { basename: "/" }
);

interface Route {
  pathname: string;
  element: ReactNode;
  children?: Route[];
  isNoneAuth?: boolean;
  isErrorBoundary?: true;
}

export default router;
