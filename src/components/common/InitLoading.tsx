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

const SvgLoading = keyframes`
  0% {
    stroke-dashoffset: 500;
    fill:rgba(0,0,0,0);
  }
  100% {
    stroke-dashoffset: 0;  
    fill:rgba(0,0,0,1);
    transition:fill 2s;
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
    stroke-dashoffset: 500;
    fill: transparent;
    opacity: 1;
    animation: ${SvgLoading} 3s linear 1 forwards,
      ${SvgBlank} 0.5s ease-in 2.5s 2 forwards;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  max-width: 570px;
  height: 4rem;
  line-height: 4rem;
  font-weight: bolder;
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 0;
  background: #6ab04c;
`;

export function InitLoading() {
  return (
    <Layout title="Bookcase">
      <SvgLoadingBlock>
        <LogoSvg />
      </SvgLoadingBlock>
      <Title>in the Phone</Title>
    </Layout>
  );
}
