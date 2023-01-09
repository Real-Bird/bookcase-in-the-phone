import { ReactNode } from "react";
import styled from "styled-components";

interface BookListProps {
  children: ReactNode;
}

const PostList = styled.div`
  width: 100%;
  height: 87vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 3rem;
  padding: 1rem 0;
  overflow-y: scroll;
`;

export function BookList({ children }: BookListProps) {
  return <PostList>{children}</PostList>;
}
