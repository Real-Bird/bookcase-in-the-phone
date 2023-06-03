import { FetchIsbnDataProvider } from "@libs/searchContextApi";
import { Navigation, InitLoading } from "@components/common";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { FetchBookcaseDataProvider } from "@libs/bookcaseContextApi";
import { useLayoutEffect, useState } from "react";
import { checkedUser } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";
import useSwipeReload from "@libs/hooks/useSwipeReload";
import SwipeLoadingSpinner from "@components/common/SwipeLoadingSpinner";

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

const SwipeLoading = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  z-index: 99999;
  transition: all 0.5s;
`;

function Root() {
  const [loading, setLoading] = useState(true);
  const userDispatch = useUserDispatch();
  const { loading: swipeLoading } = useSwipeReload();

  useLayoutEffect(() => {
    (async () => {
      const { user } = await checkedUser();
      if (!user) return;
      userDispatch({ type: "SET_USER", userInfo: user });
      return;
    })();
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
              {swipeLoading && (
                <SwipeLoading>
                  <SwipeLoadingSpinner />
                </SwipeLoading>
              )}
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
