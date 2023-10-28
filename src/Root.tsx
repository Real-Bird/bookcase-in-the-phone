import { FetchIsbnDataProvider } from "@libs/searchContextApi";
import { Navigation, InitLoading } from "@components/common";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { FetchBookcaseDataProvider } from "@libs/bookcaseContextApi";
import { useLayoutEffect, useState } from "react";

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

  useLayoutEffect(() => {
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
