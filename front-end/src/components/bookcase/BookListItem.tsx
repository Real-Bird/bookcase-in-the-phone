import { BookListType } from "@api/bookcase";
import { FetchIsbnDataState } from "@libs/searchContextApi";
import useWindowSize from "@libs/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Post = styled(Link)`
  width: 96%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  gap: 10px;
`;

const PostImage = styled.img`
  max-width: 7rem;
  width: 25%;
  height: 8rem;
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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  h3 {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    text-overflow: clip;
    white-space: pre;
    margin-bottom: 5px;
    text-align: start;
    animation-name: ${(props) => (props.isOverflow ? StreamText : "")};
    animation-duration: 7s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    &:hover {
      animation-play-state: paused;
    }
  }

  .detail_block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .detail_item {
      display: flex;
      h4 {
        font-weight: bold;
      }
    }
  }
`;

interface BookListItemProps {
  bookData: BookListType;
  idx: number;
}

export function BookListItem({ idx, bookData }: BookListItemProps) {
  const { title, author, publisher, subject, translator, title_url, ea_isbn } =
    bookData;
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
          <div className="detail_item">
            <h4>지은이</h4>|<span>{author}</span>
          </div>
          <div className="detail_item">
            {translator ? (
              <>
                <h4>옮긴이</h4>|<span>{translator}</span>
              </>
            ) : null}
          </div>
          <div className="detail_item">
            <h4>출판사</h4>|<span>{publisher}</span>
          </div>
          <div className="detail_item">
            <h4>카테고리</h4>|<span>{subject}</span>
          </div>
        </div>
      </PostDetailBox>
    </Post>
  );
}
