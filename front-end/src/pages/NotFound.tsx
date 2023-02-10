import { Button, Layout, Navigation } from "@components/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 50px;
  mark {
    font-size: 5rem;
    font-weight: 500;
  }
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Layout title="Not Found">
      <NotFoundBlock>
        <mark>NotFound</mark>
        <Button label="홈으로" onClick={() => navigate("/")} />
      </NotFoundBlock>
      <Navigation />
    </Layout>
  );
}
