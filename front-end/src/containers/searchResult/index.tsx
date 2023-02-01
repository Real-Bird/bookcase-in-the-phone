import { Button } from "@components/common";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { ResultDetail } from "@components/searchResult";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setSubject } from "@libs/utils";
import { savedBookInfo, SavedBookInfoArgs } from "@api/bookcase";

const ResultBlock = styled.div`
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

const SET_DATA: SavedBookInfoArgs = {
  title: "",
  author: "",
  translator: "",
  publisher: "",
  publisher_predate: "",
  ea_isbn: "",
  title_url: "",
  review: "",
  start_date: "",
  end_date: "",
  subject: "",
};

function ResultContainer() {
  const navigate = useNavigate();
  const isbnState = useIsbnState();
  const {
    TITLE,
    AUTHOR,
    TRANSLATOR,
    TITLE_URL,
    PUBLISHER,
    PUBLISH_PREDATE,
    EA_ISBN,
    SUBJECT,
  } = isbnState;
  const isbnDispatch = useIsbnDispatch();
  const onBack = () => {
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate("/search");
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [review, setReview] = useState("");
  const [settingData, setSettingData] = useState<SavedBookInfoArgs>(SET_DATA);
  const onSaveData = useCallback(async () => {
    const callbackData = await savedBookInfo(settingData);
    if (callbackData.error) return console.error(callbackData.message);
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate(-1);
  }, [settingData]);
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const date = new Date(value);
    const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (id === "reading-start")
      return setStartDate(localeFormatter.format(date));
    setEndDate(localeFormatter.format(date));
  };
  const onReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("시작일은 종료일 보다 빠를 수 없습니다.");
      setStartDate("");
      setEndDate("");
      return;
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if (!isbnState.TITLE) onBack();
    setSettingData({
      author: AUTHOR,
      ea_isbn: EA_ISBN,
      publisher: PUBLISHER,
      publisher_predate: PUBLISH_PREDATE,
      title: TITLE,
      title_url: TITLE_URL,
      translator: TRANSLATOR,
      subject: setSubject(SUBJECT),
      review,
      start_date: startDate,
      end_date: endDate,
    });
  }, [review, startDate, endDate]);
  return (
    <ResultBlock>
      <ButtonBlock>
        <Button label="재검색" onClick={onBack} className="retry" />
        <Button label="저장하기" onClick={onSaveData} className="save" />
      </ButtonBlock>
      <ResultDetail
        author={AUTHOR}
        ea_isbn={EA_ISBN}
        publisher={PUBLISHER}
        publisher_predate={PUBLISH_PREDATE}
        title={TITLE}
        titleUrl={TITLE_URL}
        translator={TRANSLATOR}
        onDateChange={onDateChange}
        startDateValue={startDate}
        endDateValue={endDate}
        onReviewChange={onReviewChange}
        review={review}
      />
    </ResultBlock>
  );
}

export default ResultContainer;
