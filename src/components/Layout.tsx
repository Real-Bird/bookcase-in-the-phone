import React from "react";
import styled from "styled-components";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const LayoutBlock = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bolder;
`;

const ChildrenBlock = styled.div`
  width: 100%;
  margin: 0 auto;
`;
function Layout({ title, children }: LayoutProps) {
  return (
    <LayoutBlock>
      <Title>{title}</Title>
      <ChildrenBlock>{children}</ChildrenBlock>
    </LayoutBlock>
  );
}

export default Layout;
