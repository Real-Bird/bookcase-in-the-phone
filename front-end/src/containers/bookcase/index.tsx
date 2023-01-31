import { BookList, BookListItem } from "@components/bookcase";

function BookcaseContainer() {
  const bookList = [...Array.from(Array(20).keys())];
  return (
    <BookList>
      {bookList?.map((book, idx) => (
        <BookListItem key={idx} idx={idx} />
      ))}
    </BookList>
  );
}

export default BookcaseContainer;
