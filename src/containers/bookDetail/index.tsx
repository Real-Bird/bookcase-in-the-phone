import { deleteBookInfoByIsbn, getBookInfoByIsbn } from "@api/bookcase";
import { Button, PageLoading } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useFetch } from "@libs/hooks";
import { useBookInfoDispatch, useBookInfoState } from "@store/bookcase";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function BookDetailContainer() {
  const { isbn } = useParams();
  const bookState = useBookInfoState();
  const { setBookInfo, initBookInfo } = useBookInfoDispatch();
  const navigate = useNavigate();
  const { state: bookInfo, loading } = useFetch(() =>
    getBookInfoByIsbn(isbn ?? "")
  );
  const onDeleteBook = async () => {
    if (confirm("정말 삭제할까요?")) {
      try {
        await deleteBookInfoByIsbn(bookState.ea_isbn);
        alert("성공적으로 삭제되었습니다!");
        initBookInfo();
        return navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!isbn || !bookInfo) {
      return navigate("/404", { replace: true });
    }
    setBookInfo(bookInfo.bookInfo);
  }, [isbn, loading]);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <DetailBlock>
      <ButtonBlock>
        <Button label="삭제" onClick={onDeleteBook} color="#ff4d4d" />
        <Button label="수정" onClick={() => navigate("edit")} />
      </ButtonBlock>
      <ResultDetail
        author={bookState.author}
        ea_isbn={bookState.ea_isbn}
        publisher={bookState.publisher}
        publisher_predate={bookState.publisher_predate}
        title={bookState.title}
        titleUrl={bookState.title_url}
        translator={bookState.translator}
        startDateValue={bookState.start_date ? bookState.start_date : ""}
        endDateValue={bookState.end_date ? bookState.end_date : ""}
        review={bookState.review ? bookState.review : ""}
      />
    </DetailBlock>
  );
}

export default BookDetailContainer;
