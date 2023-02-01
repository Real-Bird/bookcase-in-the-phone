import { BookListType, getBookList } from "@api/bookcase";
import { BookList, BookListItem } from "@components/bookcase";
import { useIsbnState } from "@libs/searchContextApi";
import { useEffect, useState } from "react";

function BookcaseContainer() {
  const [bookList, setBookList] = useState<BookListType[]>([]);

  useEffect(() => {
    (async () => {
      const { error, bookList } = await getBookList();
      setBookList(bookList);
    })();
  }, []);
  return (
    <BookList>
      {bookList?.map((book, idx) => (
        <BookListItem key={idx} idx={idx} bookData={book} />
      ))}
    </BookList>
  );
}

export default BookcaseContainer;
