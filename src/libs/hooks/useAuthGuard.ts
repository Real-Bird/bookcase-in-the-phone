import { checkedUser } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";
import { useCallback, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userDispatch = useUserDispatch();
  const inMemoryCache = useRef<InMemoryCache>({});

  const checkedPathCache = (pathname: string) => {
    const pathCache = inMemoryCache.current.pathCache;
    if (pathCache && pathCache[pathname]?.expired > Date.now()) {
      return true;
    }
    return false;
  };

  const handleCheckedUser = useCallback(async () => {
    const res = await checkedUser();
    if (!res || !res.isLogged) {
      inMemoryCache.current.isLogged = true;
      navigate("/login", { replace: true });
      return;
    }
    inMemoryCache.current.isLogged = false;
    if (res.isLogged && pathname === "/login") {
      navigate("/", { replace: true });
      return;
    }
    userDispatch({ type: "SET_USER", userInfo: { name: res.username } });
  }, [pathname]);

  useLayoutEffect(() => {
    if (inMemoryCache.current.isLogged) {
      navigate("/login", {
        replace: true,
      });
      return;
    }
    if (!checkedPathCache(pathname)) {
      handleCheckedUser();
      inMemoryCache.current.pathCache = {
        ...inMemoryCache.current.pathCache,
        [pathname]: { expired: Date.now() + 1000 * 60 * 60 },
      };
    }
    console.log(inMemoryCache.current);
    return () => window.localStorage.removeItem("googleLoginComplete");
  }, [pathname]);
};

type PathCache = Record<string, { expired: number }>;
interface InMemoryCache {
  isLogged?: boolean;
  pathCache?: PathCache;
}
