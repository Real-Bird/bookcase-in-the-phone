import React from "react";
import styled from "styled-components";

const LayoutBlock = styled.div`
  width: 100%;
  max-width: 570px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  max-width: 570px;
  height: 4rem;
  font-weight: bolder;
  position: fixed;
  width: 100%;
  text-align: center;
  top: 0;
  background: #6ab04c;
  z-index: 10;
`;

const ChildrenBlock = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-top: 4rem;
`;

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <LayoutBlock>
      {title && <Title>{title}</Title>}
      <ChildrenBlock>{children}</ChildrenBlock>
    </LayoutBlock>
  );
}
