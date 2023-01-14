import styled from "styled-components";

const InfoContainer = styled.div``;

const Label = styled.div``;

const InfoItem = styled.div`
  padding: 3px 5px;
  font-size: 1.25rem;
  border: 1px solid black;
  background: rgba(223, 249, 251, 0.9);
  box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  color: green;
`;

interface BookInfoItemProps {
  kind?: string;
  value: string;
}

export function BookInfoItem({ kind, value }: BookInfoItemProps) {
  return (
    <InfoContainer>
      <Label>{kind}</Label>
      <InfoItem className="info">{value}</InfoItem>
    </InfoContainer>
  );
}
