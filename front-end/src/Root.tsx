import { FetchIsbnDataProvider } from "@libs/searchContextApi";
import { Navigation } from "@components/common";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootBlock = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Root() {
  return (
    <FetchIsbnDataProvider>
      <RootBlock>
        <Navigation />
        <Outlet />
      </RootBlock>
    </FetchIsbnDataProvider>
  );
}

export default Root;
