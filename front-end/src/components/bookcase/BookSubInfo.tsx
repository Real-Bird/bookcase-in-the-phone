import styled from "styled-components";

interface BookSubInfoProps {
  kind: "지은이" | "옮긴이" | "출판사" | "카테고리";
  value?: string;
}

const BookSubInfoBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 10rem;
  h4 {
    font-weight: bold;
    width: 4rem;
  }
  div {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 6rem;
  }
`;

export function BookSubInfo({ kind, value = "-" }: BookSubInfoProps) {
  return (
    <BookSubInfoBlock>
      <h4>{kind}</h4>
      <div>| {value}</div>
    </BookSubInfoBlock>
  );
}
