import { BookListType, getBookList } from "@api/bookcase";
import { BookList, BookListItem, SearchItem } from "@components/bookcase";
import { Select } from "@components/search";
import { createFuzzyMatcher } from "@libs/utils";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SearchBarBlock = styled.div`
  display: flex;
  width: 95%;
  gap: 10px;
  align-items: flex-end;
  .select {
    width: 10rem;
  }
  span {
    text-align: justify;
  }
`;

function BookcaseContainer() {
  const [bookList, setBookList] = useState<BookListType[]>([]);
  const [initList, setInitList] = useState<BookListType[]>([]);
  const keys = ["제목", "지은이", "출판사", "카테고리"];
  const selectRef = useRef<HTMLSelectElement>(null);
  const [search, setSearch] = useState("");
  const [searchKind, setSearchKind] = useState(keys[0]);
  useEffect(() => {
    (async () => {
      const { error, bookList } = await getBookList();
      setBookList(bookList);
      setInitList(bookList);
    })();
  }, []);
  const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchKind(e.target.value);
  };
  const onSearchChange = useCallback(() => {
    if (!search) return setBookList(initList);
    const filterList = bookList?.filter((e) => {
      const regex = createFuzzyMatcher(search);
      switch (searchKind) {
        case "제목":
          return regex.test(e.title);
        case "지은이":
          return regex.test(e.author);
        case "출판사":
          return regex.test(e.publisher);
        case "카테고리":
          return regex.test(e.subject);
        default:
          return false;
      }
    });
    setBookList(filterList);
  }, [search]);
  return (
    <BookList>
      <SearchBarBlock>
        <Select
          defaultValue={searchKind}
          selectRef={selectRef}
          onChange={handleKindChange}
          className="select"
        >
          {keys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <SearchItem
          search={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={onSearchChange}
        />
        <span>총 {initList.length}권</span>
      </SearchBarBlock>
      {bookList?.map((book, idx) => (
        <BookListItem key={idx} idx={idx} bookInfo={book} />
      ))}
    </BookList>
  );
}

export default BookcaseContainer;
