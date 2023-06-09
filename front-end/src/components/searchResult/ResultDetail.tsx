import { Input, ReadingDate } from "@components/common";
import { BookInfoItem } from "@components/searchResult/BookInfoItem";
import { useWindowSize } from "@libs/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import noImage from "/no_image_available.png";

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const StreamText = keyframes`
  0% {
    transform:translateX(0%);
  }
  30% {
    transform:translateX(0%);
  }
  100% {
    transform:translateX(-240%);
  }
`;

const DetailTitle = styled.h1<{ isOverflow: boolean }>`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  white-space: pre;
  text-overflow: clip;
  animation-name: ${(props) => (props.isOverflow ? StreamText : "")};
  animation-duration: 9s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  &:hover {
    animation-play-state: paused;
  }
`;

const DetailTop = styled.div`
  width: 100%;
  max-height: 60%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const CoverImage = styled.img`
  width: 90%;
  height: 16rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
`;

const BookInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const DetailBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 10px;
  flex: 0 0 40%;
  margin-bottom: 2rem;
  .label {
    border-bottom: 1px solid black;
  }
`;

const ReadDateBox = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  height: fit-content;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ReviewBox = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  .review-area {
    background: rgba(223, 249, 251, 0.7);
    height: 5rem;
    color: green;
    font-family: "Gugi", cursive;
    appearance: none;
    border: none;
    resize: none;
    border-radius: 10px;
    padding: 0.2rem 0.5rem;
    overflow-y: scroll;
    flex: 1;
  }
  .none-edit {
    min-height: 5rem;
  }
  span {
    text-align: end;
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
  startDateValue: string;
  endDateValue: string;
  onDateChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onReviewChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isEdit?: boolean;
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
  onDateChange,
  onReviewChange,
  startDateValue,
  endDateValue,
  isEdit,
}: ResultDetailProps) {
  const REVIEW_MIN = 5;
  const REVIEW_MAX = 150;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const isChangeWindow = useWindowSize(titleRef);
  useEffect(() => {
    setIsOverflow(isChangeWindow);
  }, [isChangeWindow, title]);
  return (
    <DetailContainer>
      <DetailTitle ref={titleRef} isOverflow={isOverflow}>
        {title}
      </DetailTitle>
      <DetailTop>
        {titleUrl ? (
          <CoverImage src={titleUrl} />
        ) : (
          <CoverImage src={noImage} />
        )}
        <BookInfoBox>
          <BookInfoItem kind="지은이" value={author} />
          <BookInfoItem kind="옮긴이" value={translator ? translator : "-"} />
          <BookInfoItem kind="출판사" value={publisher} />
          <BookInfoItem kind="출판일" value={publisher_predate} />
          <BookInfoItem kind="ISBN" value={ea_isbn} />
        </BookInfoBox>
      </DetailTop>
      <DetailBottom>
        <ReadDateBox className="read-date">
          {isEdit ? (
            <>
              <Input
                type="date"
                label="독서 시작"
                name="reading-start"
                onChange={onDateChange}
                value={startDateValue}
              />
              <Input
                type="date"
                label="독서 끝"
                name="reading-end"
                onChange={onDateChange}
                value={endDateValue}
              />
            </>
          ) : (
            <>
              <ReadingDate label="독서 시작" date={startDateValue} />
              <ReadingDate label="독서 끝" date={endDateValue} />
            </>
          )}
        </ReadDateBox>
        <ReviewBox className="review">
          {isEdit ? (
            <>
              <label htmlFor="review" className="label">
                감상평
              </label>
              <textarea
                className="review-area"
                id="review"
                onChange={onReviewChange}
                value={review}
                rows={5}
                minLength={REVIEW_MIN}
                maxLength={REVIEW_MAX}
              ></textarea>
              <span>
                {review.slice(0, 150).length ?? 0} / {REVIEW_MAX} 자
              </span>
            </>
          ) : (
            <>
              <div className="label">감상평</div>
              <div className="review-area none-edit">{review}</div>
            </>
          )}
        </ReviewBox>
      </DetailBottom>
    </DetailContainer>
  );
}
