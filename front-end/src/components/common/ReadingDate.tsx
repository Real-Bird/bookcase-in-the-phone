import styled from "styled-components";

const DateBlock = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  text-align: center;
  .label {
    font-size: 1.125rem;
    border-bottom: 1px solid black;
    width: 100%;
    max-width: 6rem;
  }
  .date {
    width: 100%;
    appearance: none;
    border: none;
    background: rgba(223, 249, 251, 0.7);
    color: green;
    font-family: "Gugi", cursive;
  }
`;
interface ReadingDateProps {
  label: string;
  date: string;
}

export function ReadingDate({ label, date }: ReadingDateProps) {
  return (
    <DateBlock>
      <div className="label">{label}</div>
      <div className="date">{date}</div>
    </DateBlock>
  );
}
