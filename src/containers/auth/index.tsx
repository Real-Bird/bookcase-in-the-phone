import { GoogleLogin } from "@components/auth";
import styled from "styled-components";
import { SERVER_URL } from "constants/auth";
import { login } from "@api/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const googleLogin = () => {
    window.localStorage.setItem("googleLoginComplete", "true");
    window.open(`${SERVER_URL}/auth/google`, "_self");
  };

  const getLoginInfo = async () => {
    const res = await login();
    if (!res.error) {
      navigate("/");
      return;
    } else {
      alert(res.message);
      return;
    }
  };

  useEffect(() => {
    const isGoogleLoginComplete = window.localStorage.getItem(
      "googleLoginComplete"
    );
    if (isGoogleLoginComplete === "true") {
      getLoginInfo();
      window.localStorage.removeItem("googleLoginComplete");
    }
  }, []);

  return (
    <LoginBlock>
      <GoogleLogin onClick={googleLogin} />
    </LoginBlock>
  );
}

export default LoginContainer;
