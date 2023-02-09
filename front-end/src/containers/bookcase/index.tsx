import { getBookList } from "@api/bookcase";
import { BookListItem, SearchItem } from "@components/bookcase";
import { ToggleGridButton } from "@components/bookcase/ToggleGridButton";
import { Select } from "@components/search";
import {
  FetchBookcaseState,
  useBookcaseDispatch,
  useBookcaseState,
} from "@libs/bookcaseContextApi";
import { createFuzzyMatcher } from "@libs/utils";
import { ChangeEvent, UIEvent, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const OverviewContainer = styled.main`
  width: 100%;
  height: 87vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 3rem;
  padding: 1rem 0;
  overflow-y: scroll;
`;

const SearchBarBlock = styled.div<{ $issticky: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-end;
  background-color: ${(props) => (props.$issticky ? "#000" : "transparent")};
  color: ${(props) => (props.$issticky ? "#fff" : "#000")};
  input {
    color: ${(props) => (props.$issticky ? "#fff" : "#000")};
  }
  transition: color 0.5s, background-color 0.5s;
  .select {
    width: 8rem;
  }
  .sub {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
  }
`;

const BookListBlock = styled.div<{ $isgrid: boolean }>`
  width: 100%;
  display: ${(props) => (props.$isgrid ? "grid" : "flex")};
  grid-template-columns: 33% 33% 33%;
  flex-direction: column;
  gap: ${(props) => (props.$isgrid ? "0.5%" : "5px")};
  margin-bottom: 2rem;
`;

function BookcaseContainer() {
  const [bookList, setBookList] = useState<FetchBookcaseState>([]);
  const bookcaseDispatch = useBookcaseDispatch();
  const bookcaseState = useBookcaseState();
  const keys = ["제목", "지은이", "출판사", "분류"];
  const selectRef = useRef<HTMLSelectElement>(null);
  const [search, setSearch] = useState("");
  const [searchKind, setSearchKind] = useState(keys[0]);
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0) return setIsSearchBarSticky(false);
    return setIsSearchBarSticky(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const { error, bookList } = await getBookList();
        bookcaseDispatch({ type: "LOAD_DATA", bookcase: bookList });
        setBookList(bookList);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchKind(e.target.value);
  };
  const [isGrid, setIsGrid] = useState(false);
  return (
    <OverviewContainer onScroll={onScroll}>
      <SearchBarBlock $issticky={isSearchBarSticky}>
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
        />
        <div className="sub">
          <ToggleGridButton
            isGrid={isGrid}
            onClick={() => setIsGrid((prev) => !prev)}
          />
          <span>총 {bookcaseState.length}권</span>
        </div>
      </SearchBarBlock>
      <BookListBlock $isgrid={isGrid}>
        {bookList
          ?.filter((e) => {
            const regex = createFuzzyMatcher(search);
            switch (searchKind) {
              case "제목":
                return regex.test(e.title);
              case "지은이":
                return regex.test(e.author);
              case "출판사":
                return regex.test(e.publisher);
              case "분류":
                return regex.test(e.subject);
              default:
                return false;
            }
          })
          .map((book, idx) => (
            <BookListItem key={idx} bookInfo={book} isGrid={isGrid} />
          ))}
      </BookListBlock>
    </OverviewContainer>
  );
}

export default BookcaseContainer;
