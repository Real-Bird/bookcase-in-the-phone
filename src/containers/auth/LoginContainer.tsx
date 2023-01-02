import styled from "styled-components";
import GoogleLogin from "../../components/auth/Google";
import Layout from "../../components/Layout";

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
  return (
    <Layout title="Login">
      <LoginBlock>
        <GoogleLogin />
      </LoginBlock>
    </Layout>
  );
}

export default LoginContainer;
