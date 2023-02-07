import { googleLogin } from "@api/auth";
import { useUserDispatch } from "@libs/userContextApi";
import { GoogleLogin } from "@components/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginBlock = styled.div`
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

function LoginContainer() {
  const FetchUserDispatch = useUserDispatch();
  const navigate = useNavigate();
  const googleAuthLogin = async () => {
    try {
      const {
        data: { user },
      } = await googleLogin();
      localStorage.setItem("BiPToken", user.id);
      FetchUserDispatch({ type: "SET_USER", userInfo: user });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LoginBlock>
      <GoogleLogin onClick={googleAuthLogin} />
    </LoginBlock>
  );
}

export default LoginContainer;
