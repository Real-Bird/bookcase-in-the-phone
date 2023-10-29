import { updateBookInfoByIsbn } from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { ChangeEvent, useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DetailBlock = styled.div`
  width: 100%;
  height: 87vh;
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

function EditBookDetailContainer() {
  const navigate = useNavigate();
  const bookInfo = useIsbnState();
  const bookInfoDispatch = useIsbnDispatch();
  const [newReview, setNewReview] = useState(bookInfo.review ?? "");
  const onUpdateData = useCallback(async () => {
    const { start_date, end_date, ea_isbn } = bookInfo;
    const body = { start_date, end_date, review: newReview };
    (await bookInfoDispatch)({
      type: "SET_DATA",
      bookInfo: { ...bookInfo, review: newReview },
    });
    await updateBookInfoByIsbn(ea_isbn, body);
    return navigate(-1);
  }, [bookInfo, newReview]);
  const onDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start")
      return (await bookInfoDispatch)({
        type: "SET_DATA",
        bookInfo: {
          ...bookInfo,
          start_date: value ? localeFormatter.format(new Date(value)) : "",
        },
      });
    (await bookInfoDispatch)({
      type: "SET_DATA",
      bookInfo: {
        ...bookInfo,
        end_date: value ? localeFormatter.format(new Date(value)) : "",
      },
    });
  };
  const onReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
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
            review={newReview}
            onDateChange={onDateChange}
            onReviewChange={onReviewChange}
          />
        </DetailBlock>
      )}
    </>
  );
}

export default EditBookDetailContainer;
