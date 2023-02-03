import { updateBookInfoByIsbn } from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { ChangeEvent, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DetailBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 1rem;
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

function EditBookDetailContainer() {
  const navigate = useNavigate();
  const bookInfo = useIsbnState();
  const bookInfoDispatch = useIsbnDispatch();
  const onUpdateData = useCallback(async () => {
    const { start_date, end_date, ea_isbn, review } = bookInfo;
    const body = { start_date, end_date, review };
    await updateBookInfoByIsbn(ea_isbn, body);
    return navigate(-1);
  }, [bookInfo]);
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start")
      return bookInfoDispatch({
        type: "SET_DATA",
        bookInfo: {
          ...bookInfo,
          start_date: value ? localeFormatter.format(new Date(value)) : "",
        },
      });
    bookInfoDispatch({
      type: "SET_DATA",
      bookInfo: {
        ...bookInfo,
        end_date: value ? localeFormatter.format(new Date(value)) : "",
      },
    });
  };
  const onReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    bookInfoDispatch({
      type: "SET_DATA",
      bookInfo: { ...bookInfo, review: e.target.value },
    });
  };
  return (
    <>
      {!bookInfo.hasData ? (
        <Navigate to={"/"} replace />
      ) : (
        <DetailBlock>
          <ButtonBlock>
            <Button label="취소" onClick={() => navigate(-1)} color="#ff4d4d" />
            <Button label="저장하기" onClick={onUpdateData} />
          </ButtonBlock>
          <ResultDetail
            isEdit
            author={bookInfo.author}
            ea_isbn={bookInfo.ea_isbn}
            publisher={bookInfo.publisher}
            publisher_predate={bookInfo.publisher_predate}
            title={bookInfo.title}
            titleUrl={bookInfo.title_url}
            translator={bookInfo.translator}
            startDateValue={bookInfo.start_date ? bookInfo.start_date : ""}
            endDateValue={bookInfo.end_date ? bookInfo.end_date : ""}
            review={bookInfo.review ? bookInfo.review : ""}
            onDateChange={onDateChange}
            onReviewChange={onReviewChange}
          />
        </DetailBlock>
      )}
    </>
  );
}

export default EditBookDetailContainer;
