import { GoogleLogin } from "@components/auth";
import styled from "styled-components";
import { SERVER_URL } from "constants/auth";

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
  const googleLogin = () => {
    window.open(`${SERVER_URL}/auth/google`, "_self");
  };

  return (
    <LoginBlock>
      <GoogleLogin onClick={googleLogin} />
    </LoginBlock>
  );
}

export default LoginContainer;
