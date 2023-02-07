import { BookSubInfo } from "@components/bookcase";
import { BookcaseSubInfo } from "@libs/bookcaseContextApi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import noImage from "/no_image_available.png";

const Post = styled(Link)<{ $isgrid: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.$isgrid ? "column" : "row")};
  padding: 5px 0;
  gap: 10px;
  text-align: ${(props) => (props.$isgrid ? "center" : "start")};
  &:nth-child(2n + 1) {
    background-color: rgba(223, 249, 251, 0.4);
  }
  h3 {
    font-size: ${(props) => (props.$isgrid ? "1.125rem" : "1.5rem")};
  }
  img {
    width: ${(props) => (props.$isgrid ? "7rem" : "5rem")};
  }
  .detail_block {
    display: ${(props) => (props.$isgrid ? "none" : "grid")};
  }
`;

const PostImage = styled.img`
  aspect-ratio: 9/12;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
`;

const PostDetailBox = styled.div`
  width: 75%;
  overflow: hidden;
  .detail_block {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h3`
  width: 100%;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  margin-bottom: 10px;
`;

interface BookListItemProps {
  bookInfo: BookcaseSubInfo;
  isGrid: boolean;
}

export function BookListItem({ bookInfo, isGrid }: BookListItemProps) {
  const { title, author, publisher, subject, translator, title_url, ea_isbn } =
    bookInfo;
  return (
    <Post to={`/books/${ea_isbn}`} title={title} $isgrid={isGrid}>
      {title_url ? <PostImage src={title_url} /> : <PostImage src={noImage} />}
      <PostDetailBox>
        <Title>{title}</Title>
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
