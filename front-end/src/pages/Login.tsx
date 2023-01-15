import { Layout } from "@components/common";
import LoginContainer from "@containers/auth";

export function Login() {
  return (
    <Layout title="Login">
      <LoginContainer />
    </Layout>
  );
}
