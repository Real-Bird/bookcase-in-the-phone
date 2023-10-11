import { FetchIsbnDataProvider } from "@libs/searchContextApi";
import { Navigation, InitLoading } from "@components/common";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FetchBookcaseDataProvider } from "@libs/bookcaseContextApi";
import { useCallback, useLayoutEffect, useState } from "react";
import { checkedUser } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";

const RootBlock = styled.div`
  width: 100%;
  max-width: 570px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Root() {
  const [loading, setLoading] = useState(true);
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleCheckedUser = useCallback(async () => {
    const res = await checkedUser();
    if (!res) return;
    if (!res.isLogged) {
      alert(res.message);
      navigate("/login");
      return;
    }
    if (res.user) {
      userDispatch({ type: "SET_USER", userInfo: { name: res.user } });
      return;
    }
  }, []);

  useLayoutEffect(() => {
    if (!pathname.includes("login")) {
      handleCheckedUser();
    }
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <FetchBookcaseDataProvider>
      <FetchIsbnDataProvider>
        <RootBlock>
          {loading ? (
            <InitLoading />
          ) : (
            <>
              <Navigation />
              <Outlet />
            </>
          )}
        </RootBlock>
      </FetchIsbnDataProvider>
    </FetchBookcaseDataProvider>
  );
}

export default Root;
