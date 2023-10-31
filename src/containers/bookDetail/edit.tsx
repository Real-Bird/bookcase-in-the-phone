import { updateBookInfoByIsbn } from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useBookInfoDispatch, useBookInfoState } from "@store/selectors";
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
  const { setBookInfo } = useBookInfoDispatch();
  const bookState = useBookInfoState();
  const [newReview, setNewReview] = useState(bookState.review ?? "");

  const onUpdateData = useCallback(async () => {
    const { start_date, end_date, ea_isbn } = bookState;
    const body = { start_date, end_date, review: newReview };
    setBookInfo({ ...bookState, review: newReview });
    await updateBookInfoByIsbn(ea_isbn, body);
    return navigate(-1);
  }, [bookState, newReview]);

  const onDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start") {
      return setBookInfo({
        ...bookState,
        start_date: value ? localeFormatter.format(new Date(value)) : "",
      });
    }
    setBookInfo({
      ...bookState,
      end_date: value ? localeFormatter.format(new Date(value)) : "",
    });
  };
  const onReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  if (!bookState.ea_isbn) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <DetailBlock>
      <ButtonBlock>
        <Button label="취소" onClick={() => navigate(-1)} color="#ff4d4d" />
        <Button label="저장하기" onClick={onUpdateData} />
      </ButtonBlock>
      <ResultDetail
        isEdit
        author={bookState.author}
        ea_isbn={bookState.ea_isbn}
        publisher={bookState.publisher}
        publisher_predate={bookState.publisher_predate}
        title={bookState.title}
        titleUrl={bookState.title_url}
        translator={bookState.translator}
        startDateValue={bookState.start_date ? bookState.start_date : ""}
        endDateValue={bookState.end_date ? bookState.end_date : ""}
        review={newReview}
        onDateChange={onDateChange}
        onReviewChange={onReviewChange}
      />
    </DetailBlock>
  );
}

export default EditBookDetailContainer;
