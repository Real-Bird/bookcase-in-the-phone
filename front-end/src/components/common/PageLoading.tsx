import { Layout, LogoSvg } from "@components/common";
import styled, { keyframes } from "styled-components";

const SvgBlank = keyframes`
    0%{
    opacity:0;
  }
  100%{
    opacity:1;
  }
`;

const SvgLoadingBlock = styled.div`
  width: 100%;
  height: 87vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 3rem;
  padding: 1rem 0;
  overflow-y: scroll;
  svg > path {
    stroke: #000000;
    stroke-width: 50px;
    stroke-dasharray: 500;
    fill: #000000;
    opacity: 1;
    animation: ${SvgBlank} 1s ease-in 0s infinite forwards;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  max-width: 570px;
  height: 4rem;
  line-height: 4rem;
  font-weight: bolder;
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 0;
  z-index: 99999;
  background: #6ab04c;
`;

export function PageLoading() {
  return (
    <Layout title="LOADING...">
      <SvgLoadingBlock>
        <LogoSvg />
      </SvgLoadingBlock>
      <Title>&copy; Created By Real-Bird, 2023</Title>
    </Layout>
  );
}
