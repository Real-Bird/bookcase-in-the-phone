import React from "react";
import { useNavigate } from "react-router-dom";
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
  position: relative;
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
`;

const ChildrenBlock = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-top: 4rem;
`;

const BackwardBlock = styled.div`
  background: rgba(223, 249, 251, 0.7);
  border-radius: 100%;
  padding: 10px;
  position: absolute;
  top: 0.5rem;
  left: 4%;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  back?: string;
}

export function Layout({ title, children, back }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <LayoutBlock>
      {title && <Title>{title}</Title>}
      {back && (
        <BackwardBlock
          onClick={() => {
            if (back === "-1") return navigate(-1);
            return navigate(back);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </BackwardBlock>
      )}
      <ChildrenBlock>{children}</ChildrenBlock>
    </LayoutBlock>
  );
}
