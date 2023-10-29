import { Navigation, InitLoading } from "@components/common";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
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
  );
}

export default Root;
