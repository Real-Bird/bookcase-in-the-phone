import styled from "styled-components";
import BookListItem from "./BookListItem";

const PostList = styled.div`
  width: 100%;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 3rem;
  padding: 1rem 0;
`;

interface BookListProps {
  bookList: unknown[];
}

function BookList({ bookList }: BookListProps) {
  return (
    <PostList>
      {bookList.map((e, i) => (
        <BookListItem key={i} />
      ))}
    </PostList>
  );
}

export default BookList;
