import { checkedUser } from "@api/auth";
import { UserActionTypes, useUserDispatch } from "@store/user";
import { inMemoryCache } from "main";
import { useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userDispatch = useUserDispatch();

  const checkedPathCache = (pathname: string) => {
    const pathCache = inMemoryCache.pathCache;
    if (pathCache && pathCache[pathname]?.expired > Date.now()) {
      return true;
    }
    inMemoryCache.pathCache = {
      ...inMemoryCache.pathCache,
      [pathname]: { expired: 0 },
    };
    return false;
  };

  const handleCheckedUser = useCallback(async () => {
    const res = await checkedUser();
    if (!res || !res.isLogged) {
      inMemoryCache.isNonLogged = true;
      navigate("/login", { replace: true });
      return;
    }
    inMemoryCache.isNonLogged = false;
    if (res.isLogged && pathname === "/login") {
      navigate("/", { replace: true });
      return;
    }
    userDispatch({
      type: UserActionTypes.SET_USER,
      payload: { username: res.username },
    });
  }, [pathname]);

  useLayoutEffect(() => {
    if (inMemoryCache.isNonLogged) {
      navigate("/login", {
        replace: true,
      });
      return;
    }
    if (!checkedPathCache(pathname)) {
      handleCheckedUser();
      inMemoryCache.pathCache = {
        ...inMemoryCache.pathCache,
        [pathname]: { expired: Date.now() + 1000 * 60 * 60 },
      };
    }
    return () => window.localStorage.removeItem("googleLoginComplete");
  }, [pathname]);
};
