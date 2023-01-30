import { useUserDispatch, useUserState } from "@/libs/userContextApi";
import { GoogleLogin, Logout } from "@components/auth";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

function AboutContainer() {
  const { userInfo, isLoggedIn } = useUserState();
  const FetchUserDispatch = useUserDispatch();
  const navigate = useNavigate();
  const getUser = async (url: string) => {
    try {
      const { data } = await axios.get(url, { withCredentials: true });
      FetchUserDispatch({ type: "SET_USER", userInfo: data.user });
    } catch (err) {
      console.log(err);
    }
  };
  const googleAuthLogin = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  const googleAuthLogout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
    FetchUserDispatch({ type: "INITIALIZE_USER" });
  };
  useEffect(() => {
    getUser(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login/success`);
  }, []);
  return (
    <AboutBlock>
      {isLoggedIn ? (
        <Logout onClick={googleAuthLogout} />
      ) : (
        <GoogleLogin onClick={googleAuthLogin} />
      )}
      <footer>&copy; Bookcase in the Phone 2023 by Real-Bird</footer>
    </AboutBlock>
  );
}

export default AboutContainer;
