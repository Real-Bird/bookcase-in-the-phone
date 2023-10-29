import { checkedUser } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";
import { inMemoryCache } from "main";
import { useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userDispatch = useUserDispatch();

  const handleCheckedUser = useCallback(async () => {
    const res = await checkedUser();
    if (!res || !res.isLogged) {
      inMemoryCache.isLogged = true;
      navigate("/login", { replace: true });
      return;
    }
    inMemoryCache.isLogged = false;
    if (res.isLogged && pathname === "/login") {
      navigate("/", { replace: true });
      return;
    }
    userDispatch({ type: "SET_USER", userInfo: { name: res.username } });
  }, [pathname]);

  useLayoutEffect(() => {
    if (inMemoryCache.isLogged) {
      navigate("/login", {
        replace: true,
      });
      return;
    }
    handleCheckedUser();
    return () => window.localStorage.removeItem("googleLoginComplete");
  }, [pathname]);
};
