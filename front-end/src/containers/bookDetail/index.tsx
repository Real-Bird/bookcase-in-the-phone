import { getBookInfoByIsbn } from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function BookDetailContainer() {
  const { isbn } = useParams();
  const isbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const bookInfo = useIsbnState();
  useEffect(() => {
    if (isbn) {
      getBookInfoByIsbn(isbn)
        .then(({ bookInfo: fetchBookInfo }) => {
          if (fetchBookInfo)
            isbnDispatch({
              type: "SET_DATA",
              bookInfo: {
                ...fetchBookInfo,
              },
            });
        })
        .catch((e) => navigate("/404"));
    }
  }, [isbn]);
  return (
    <DetailBlock>
      <ButtonBlock>
        <Button
          label="뒤로가기"
          onClick={() => {
            navigate(-1);
          }}
          color="#ff4d4d"
        />
        <Button label="수정" onClick={() => navigate("edit")} />
      </ButtonBlock>
      <ResultDetail
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
      />
    </DetailBlock>
  );
}

export default BookDetailContainer;
