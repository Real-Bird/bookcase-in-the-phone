import styled from "styled-components";
import Logout from "../../components/auth/Logout";
import Layout from "../../components/Layout";

const AboutBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
  padding: 1rem 10px;
`;

function AboutContainer() {
  return (
    <Layout title="ABOUT">
      <AboutBlock>
        <Logout />
        <footer>&copy; Bookcase in the Phone 2023 by Real-Bird</footer>
      </AboutBlock>
    </Layout>
  );
}

export default AboutContainer;
