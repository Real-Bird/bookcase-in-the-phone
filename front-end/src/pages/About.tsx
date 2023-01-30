import LoginContainer from "@/containers/auth";
import { Layout } from "@components/common";
import AboutContainer from "@containers/about";
import { useEffect, useState } from "react";

export function About() {
  return (
    <Layout title="ABOUT">
      <AboutContainer />
    </Layout>
  );
}
