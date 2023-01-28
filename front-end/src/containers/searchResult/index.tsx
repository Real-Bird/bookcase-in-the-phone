import { Button } from "@/components/common/Button";
import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
import { ResultDetail } from "@components/searchResult";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

type SetDataType = typeof SET_DATA;

const SET_DATA = {
  title: "",
  author: "",
  translator: "",
  publisher: "",
  publisher_predate: "",
  ea_isbn: "",
  titleUrl: "",
  review: "",
  startDateValue: "",
  endDateValue: "",
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
  } = isbnState;
  const isbnDispatch = useIsbnDispatch();
  const onBack = () => {
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate("/search");
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [review, setReview] = useState("");
  const [settingData, setSettingData] = useState<SetDataType>(SET_DATA);
  const saveData = useCallback(() => {
    console.log(settingData);
    isbnDispatch({ type: "INITIALIZE_DATA" });
    setStartDate("");
    setEndDate("");
    setReview("");
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
      titleUrl: TITLE_URL,
      translator: TRANSLATOR,
      review,
      startDateValue: startDate,
      endDateValue: endDate,
    });
  }, [review, startDate, endDate]);
  return (
    <ResultBlock>
      <ButtonBlock>
        <Button label="재검색" onClick={onBack} className="retry" />
        <Button label="저장하기" onClick={saveData} className="save" />
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
