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
  max-width: 1024px;
  height: 4rem;
  font-weight: bolder;
  position: fixed;
  width: 100%;
  text-align: center;
  top: 0;
  background: #6ab04c; ;
`;

const ChildrenBlock = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-top: 4rem;
`;
export function Layout({ title, children }: LayoutProps) {
  return (
    <LayoutBlock>
      <Title>{title}</Title>
      <ChildrenBlock>{children}</ChildrenBlock>
    </LayoutBlock>
  );
}
