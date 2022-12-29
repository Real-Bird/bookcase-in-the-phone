import styled from "styled-components";
import Layout from "../Layout";

const CamBlock = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Camera = styled.div`
  width: 80%;
  height: 80%;
  background: rgba(223, 249, 251, 0.7);
`;

function SearchCam() {
  return (
    <Layout title="Search">
      <CamBlock>
        <Camera />
      </CamBlock>
    </Layout>
  );
}

export default SearchCam;
