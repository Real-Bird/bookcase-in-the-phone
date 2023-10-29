import { deleteBookInfoByIsbn, getBookInfoByIsbn } from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
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
  const isbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const bookInfoState = useIsbnState();
  const onDeleteBook = async () => {
    if (confirm("정말 삭제할까요?")) {
      try {
        await deleteBookInfoByIsbn(bookInfoState.ea_isbn);
        alert("성공적으로 삭제되었습니다!");
        (await isbnDispatch)({ type: "INITIALIZE_DATA" });
        return navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    if (isbn) {
      (async () => {
        const res = await getBookInfoByIsbn(isbn);
        if (!res) {
          return navigate("/404");
        }
        return isbnDispatch({
          type: "SET_DATA",
          bookInfo: res.bookInfo,
        });
      })();
    }
  }, [isbn]);
  return (
    <DetailBlock>
      <ButtonBlock>
        <Button label="삭제" onClick={onDeleteBook} color="#ff4d4d" />
        <Button label="수정" onClick={() => navigate("edit")} />
      </ButtonBlock>
      <ResultDetail
        author={bookInfoState.author}
        ea_isbn={bookInfoState.ea_isbn}
        publisher={bookInfoState.publisher}
        publisher_predate={bookInfoState.publisher_predate}
        title={bookInfoState.title}
        titleUrl={bookInfoState.title_url}
        translator={bookInfoState.translator}
        startDateValue={
          bookInfoState.start_date ? bookInfoState.start_date : ""
        }
        endDateValue={bookInfoState.end_date ? bookInfoState.end_date : ""}
        review={bookInfoState.review ? bookInfoState.review : ""}
      />
    </DetailBlock>
  );
}

export default BookDetailContainer;
