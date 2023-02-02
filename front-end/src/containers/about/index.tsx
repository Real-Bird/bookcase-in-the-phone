import { logout } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";
import { Logout } from "@components/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AboutBlock = styled.div`
  width: 100%;
  height: 87vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
  padding: 1rem 10px;
  position: relative;
  footer {
    position: absolute;
    bottom: 2rem;
  }
`;

function AboutContainer() {
  const FetchUserDispatch = useUserDispatch();
  const navigate = useNavigate();
  const googleAuthLogout = async () => {
    FetchUserDispatch({ type: "INITIALIZE_USER" });
    localStorage.removeItem("BiPToken");
    await logout();
    navigate("/");
  };
  return (
    <AboutBlock>
      <Logout onClick={googleAuthLogout} />
      <footer>&copy; Bookcase in the Phone 2023 by Real-Bird</footer>
    </AboutBlock>
  );
}

export default AboutContainer;
