import { Button, PageLoading } from "@components/common";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { ResultDetail } from "@components/searchResult";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GetInfoReturn, getInfo, savedBookInfo } from "@api/bookcase";
import { useFetch } from "@libs/hooks";

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
  const location = useLocation();
  const barcode = location.pathname.split("/").slice(-1)[0];
  const isbnState = useIsbnState();
  const {
    title,
    author,
    translator,
    title_url,
    publisher,
    publisher_predate,
    ea_isbn,
    loading,
  } = isbnState;
  const isbnDispatch = useIsbnDispatch();

  const onBack = () => {
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate("/search");
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newReview, setNewReview] = useState("");
  const {
    state: newInfoState,
    loading: newInfoLoading,
    error: newInfoError,
  } = useFetch<GetInfoReturn>(() => getInfo(barcode));

  const onSaveData = useCallback(async () => {
    const callbackData = await savedBookInfo({
      ...isbnState,
      review: newReview,
    });
    if (callbackData.error) {
      return console.error(callbackData.message);
    }
    isbnDispatch({ type: "INITIALIZE_DATA" });
    return navigate(`/books/${ea_isbn}`);
  }, [isbnState, newReview]);
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const date = new Date(value);
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start") {
      setStartDate(value);
      isbnDispatch({
        type: "SET_DATA",
        bookInfo: { ...isbnState, start_date: localeFormatter.format(date) },
      });
      return;
    }
    setEndDate(value);
    isbnDispatch({
      type: "SET_DATA",
      bookInfo: { ...isbnState, end_date: localeFormatter.format(date) },
    });
    return;
  };
  const onReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  useEffect(() => {
    if (newInfoState?.ok && newInfoState?.bookInfo) {
      isbnDispatch({ type: "SET_DATA", bookInfo: newInfoState.bookInfo });
    }
  }, [newInfoState?.ok]);

  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("시작일은 종료일 보다 빠를 수 없습니다.");
      setStartDate("");
      setEndDate("");
      return;
    }
  }, [startDate, endDate]);

  if (loading || newInfoLoading) {
    return <PageLoading />;
  }
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
        publisher_predate={publisher_predate}
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