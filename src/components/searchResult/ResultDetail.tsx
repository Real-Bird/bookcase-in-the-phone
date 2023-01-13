import { BookInfoItem } from "@/components/searchResult/BookInfoItem";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

const DetailTop = styled.div`
  width: 100%;
  max-height: 40%;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
`;

const CoverImage = styled.img`
  width: 12rem;
  aspect-ratio: 2/6;
  border-radius: 5px;
  background: tan;
`;

const BookInfoBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > .info {
    padding: 3px 5px;
    font-size: 1.25rem;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  }
`;

const DetailBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > .description {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    height: 15rem;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  }

  & > .review {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    height: 8rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
    & > label {
      font-size: 1.125rem;
      border-bottom: 1px solid black;
    }
    & > #review {
      height: 100%;
      overflow-y: scroll;
    }
  }
`;

interface ResultDetailProps {
  titleUrl: string;
  title: string;
  author: string;
  publisher: string;
  publisher_predate: string;
  ea_isbn: string;
  translator: string | undefined;
  review: string;
  onChange: () => void;
}

export function ResultDetail({
  author,
  ea_isbn,
  publisher,
  publisher_predate,
  title,
  titleUrl,
  translator,
  review,
  onChange,
}: ResultDetailProps) {
  return (
    <DetailContainer>
      <DetailTop>
        <CoverImage src={titleUrl} />
        <BookInfoBox>
          <BookInfoItem kind="제목" value={title} />
          <BookInfoItem kind="지은이" value={author} />
          {translator ? (
            <BookInfoItem kind="옮긴이" value={translator} />
          ) : null}
          <BookInfoItem kind="출판사" value={publisher} />
          <BookInfoItem kind="출판일" value={publisher_predate} />
          <BookInfoItem kind="ISBN" value={ea_isbn} />
        </BookInfoBox>
      </DetailTop>
      <DetailBottom>
        <div className="review">
          <label htmlFor="review">감상평</label>
          <textarea id="review" onChange={onChange} value={review}></textarea>
        </div>
      </DetailBottom>
    </DetailContainer>
  );
}
