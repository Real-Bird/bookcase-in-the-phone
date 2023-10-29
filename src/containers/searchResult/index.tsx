import { Button, PageLoading } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { hasBookByIsbn, savedBookInfo } from "@api/bookcase";
import { useFetch } from "@libs/hooks";
import {
  BookcaseActionTypes,
  useBookcaseDispatch,
  useBookcaseState,
} from "@store/bookcase";

const ResultBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem;
`;

const ButtonBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 0 20px;
  justify-items: center;
  margin-bottom: 10px;
`;

function ResultContainer() {
  const navigate = useNavigate();
  const { book: bookState } = useBookcaseState();
  const { pathname } = useLocation();
  const {
    title,
    author,
    translator,
    title_url,
    publisher,
    publisher_predate,
    ea_isbn,
  } = bookState;
  const bookDispatch = useBookcaseDispatch();

  const { state: hasBookState, loading } = useFetch(() =>
    hasBookByIsbn(ea_isbn || pathname.split("/").slice(-1)[0])
  );

  const onBack = () => {
    bookDispatch({
      type: BookcaseActionTypes.INITIALIZE_BOOK,
    });
    navigate("/search");
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newReview, setNewReview] = useState("");
  const onSaveData = useCallback(async () => {
    const callbackData = await savedBookInfo({
      ...bookState,
      review: newReview,
    });
    if (callbackData && callbackData.error)
      return console.error(callbackData.message);
    bookDispatch({
      type: BookcaseActionTypes.INITIALIZE_BOOK,
    });
    return navigate(`/books/${ea_isbn}`);
  }, [bookState, newReview]);
  const onDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const date = new Date(value);
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start") {
      setStartDate(value);
      bookDispatch({
        type: BookcaseActionTypes.SET_BOOK,
        payload: {
          book: {
            ...bookState,
            start_date: localeFormatter.format(date),
          },
        },
      });
      return;
    }
    setEndDate(value);
    bookDispatch({
      type: BookcaseActionTypes.SET_BOOK,
      payload: {
        book: {
          ...bookState,
          end_date: localeFormatter.format(date),
        },
      },
    });
    return;
  };
  const onReviewChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("시작일은 종료일 보다 빠를 수 없습니다.");
      setStartDate("");
      setEndDate("");
      return;
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (!bookState.ea_isbn && hasBookState && hasBookState?.bookInfo) {
      bookDispatch({
        type: BookcaseActionTypes.SET_BOOK,
        payload: { book: { ...hasBookState.bookInfo } },
      });
    }
  }, [bookState, hasBookState]);

  if (loading) return <PageLoading />;

  return (
    <ResultBlock>
      <ButtonBlock>
        <Button label="재검색" onClick={onBack} className="retry" />
        <Button label="저장하기" onClick={onSaveData} className="save" />
      </ButtonBlock>
      <ResultDetail
        isEdit
        author={author}
        ea_isbn={ea_isbn}
        publisher={publisher}
        publisher_predate={publisher_predate ?? ""}
        title={title}
        titleUrl={title_url}
        translator={translator}
        onDateChange={onDateChange}
        startDateValue={startDate}
        endDateValue={endDate}
        onReviewChange={onReviewChange}
        review={newReview}
      />
    </ResultBlock>
  );
}

export default ResultContainer;
