import BookList from "../../components/bookcase/BookList";

function BookcaseContainer() {
  const bookList = [...Array.from(Array(20).keys())];
  return <BookList bookList={bookList} />;
}

export default BookcaseContainer;
