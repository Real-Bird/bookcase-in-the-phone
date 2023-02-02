import {
  BookInfoResponse,
  getBookInfoByIsbn,
  SavedBookInfoArgs,
} from "@api/bookcase";
import { Button } from "@components/common";
import { ResultDetail } from "@components/searchResult";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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

const INITIAL_DATA: SavedBookInfoArgs = {
  author: "",
  ea_isbn: "",
  end_date: "",
  publisher: "",
  publisher_predate: "",
  review: "",
  start_date: "",
  subject: "",
  title: "",
  title_url: "",
  translator: "",
};

function BookDetailContainer() {
  const [toggleEdit, setToggleEdit] = useState(false);
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState<SavedBookInfoArgs>(INITIAL_DATA);
  useEffect(() => {
    if (isbn) {
      getBookInfoByIsbn(isbn)
        .then(({ bookInfo }) => {
          if (bookInfo) setBookInfo(bookInfo);
        })
        .catch((e) => navigate("/404"));
    }
  }, [isbn]);
  return (
    <DetailBlock>
      <ButtonBlock>
        <Button
          label={toggleEdit ? "취소" : "수정"}
          onClick={() => setToggleEdit((prev) => !prev)}
          className="modified"
        />
        {toggleEdit ? (
          <Button label="저장하기" onClick={() => {}} className="save" />
        ) : (
          <Button
            label="뒤로가기"
            onClick={() => {
              navigate(-1);
            }}
            className="save"
          />
        )}
      </ButtonBlock>
      <ResultDetail
        isEdit={toggleEdit}
        author={bookInfo.author}
        ea_isbn={bookInfo.ea_isbn}
        publisher={bookInfo.publisher}
        publisher_predate={bookInfo.publisher_predate}
        title={bookInfo.title}
        titleUrl={bookInfo.title_url}
        translator={bookInfo.translator}
        startDateValue={bookInfo.start_date}
        endDateValue={bookInfo.end_date}
        review={bookInfo.review}
      />
    </DetailBlock>
  );
}

export default BookDetailContainer;
