import { GoogleLogin } from "@components/auth";
import styled from "styled-components";

const LoginBlock = styled.div`
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

function LoginContainer() {
  return <LoginBlock>{/* <GoogleLogin /> */}</LoginBlock>;
}

export default LoginContainer;
