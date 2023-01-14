import { Button } from "@/components/common/Button";
import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
import { ResultDetail } from "@components/searchResult";
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

function ResultContainer() {
  const navigate = useNavigate();
  const {
    AUTHOR,
    EA_ISBN,
    TITLE,
    TITLE_URL,
    PUBLISHER,
    PUBLISH_PREDATE,
    TRANSLATOR,
  } = useIsbnState();
  const isbnDispatch = useIsbnDispatch();
  const onBack = () => {
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate("/search");
  };

  const onSave = () => console.log("저장 완료");
  return (
    <ResultBlock>
      <ButtonBlock>
        <Button label="재검색" onClick={onBack} className="retry" />
        <Button label="저장하기" onClick={onSave} className="save" />
      </ButtonBlock>
      <ResultDetail
        author={AUTHOR}
        ea_isbn={EA_ISBN}
        publisher={PUBLISHER}
        publisher_predate={PUBLISH_PREDATE}
        title={TITLE}
        titleUrl={TITLE_URL}
        translator={TRANSLATOR}
        onChange={() => {}}
        review={"abc"}
      />
    </ResultBlock>
  );
}

export default ResultContainer;
