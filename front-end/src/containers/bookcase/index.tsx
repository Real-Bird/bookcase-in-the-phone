import { BookListType, getBookList } from "@api/bookcase";
import { BookList, BookListItem } from "@components/bookcase";
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
  label {
    flex: 1;
    height: 100%;
    position: relative;
    input {
      box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
      border: none;
      appearance: none;
      outline: none;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.3) 3em,
        rgba(255, 255, 255, 0.2) 3em
      );
      height: 100%;
      width: 100%;
    }
    svg {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 25%;
      left: 3%;
    }
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
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type={"search"}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={onSearchChange}
            value={search}
          />
        </label>
        <span>총 {initList.length}권</span>
      </SearchBarBlock>
      {bookList?.map((book, idx) => (
        <BookListItem key={idx} idx={idx} bookData={book} />
      ))}
    </BookList>
  );
}

export default BookcaseContainer;
