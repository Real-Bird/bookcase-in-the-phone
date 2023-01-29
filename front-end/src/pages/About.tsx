import LoginContainer from "@/containers/auth";
import { Layout } from "@components/common";
import AboutContainer from "@containers/about";
import { useEffect, useState } from "react";

export function About() {
  const [login, isLogin] = useState(false);
  useEffect(() => {
    const tmp = getUser();
    tmp.then((data) => console.log(data));
  }, []);

  async function getUser() {
    const data = await fetch("http://localhost:8000/auth", { method: "get" });
    return data.json();
  }
  return (
    <Layout title="ABOUT">
      {login ? <AboutContainer /> : <LoginContainer />}
    </Layout>
  );
}
