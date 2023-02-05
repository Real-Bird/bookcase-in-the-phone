import { BookListType } from "@api/bookcase";
import { BookSubInfo } from "@components/bookcase";
import useWindowSize from "@libs/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Post = styled(Link)`
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  gap: 10px;
`;

const PostImage = styled.img`
  aspect-ratio: 9/12;
  width: 5rem;
  border-radius: 5px;
  background: tan;
`;

const StreamText = keyframes`
  0% {
    transform:translateX(0%);
  }
  30%{
    transform:translateX(0%);
  }
  100% {
    transform:translateX(-350%);
  }
`;

const PostDetailBox = styled.div<{ isOverflow: boolean }>`
  width: 75%;
  overflow: hidden;
  h3 {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    text-overflow: clip;
    white-space: pre;
    margin-bottom: 10px;
    text-align: start;
    animation: ${(props) => (props.isOverflow ? StreamText : "")} 10s linear
      infinite normal forwards;
    &:hover {
      animation-play-state: paused;
    }
  }

  .detail_block {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

interface BookListItemProps {
  bookInfo: BookListType;
  idx: number;
}

export function BookListItem({ idx, bookInfo }: BookListItemProps) {
  const { title, author, publisher, subject, translator, title_url, ea_isbn } =
    bookInfo;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const isChangeWindow = useWindowSize(titleRef);
  useEffect(() => {
    setIsOverflow(isChangeWindow);
  }, [isChangeWindow]);
  return (
    <Post to={`/books/${ea_isbn}`} title={title}>
      {title_url ? (
        <PostImage src={title_url} />
      ) : (
        <PostImage src="https://picsum.photos/200/300" />
      )}
      <PostDetailBox isOverflow={isOverflow}>
        <h3 ref={titleRef}>{title}</h3>
        <div className="detail_block">
          <BookSubInfo kind="지은이" value={author} />
          <BookSubInfo kind="옮긴이" value={translator} />
          <BookSubInfo kind="출판사" value={publisher} />
          <BookSubInfo kind="카테고리" value={subject} />
        </div>
      </PostDetailBox>
    </Post>
  );
}
