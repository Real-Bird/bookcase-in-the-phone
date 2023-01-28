import styled from "styled-components";

const InfoContainer = styled.div`
  position: relative;
`;

const Label = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0.25rem, -0.55rem);
  background: linear-gradient(#e1afea 50%, #dff2f9 50%);
`;

const InfoItem = styled.div`
  padding: 0.5rem 5px;
  font-size: 1.25rem;
  border: 1px solid black;
  background: rgba(223, 249, 251, 0.9);
  box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  color: green;
  span {
    padding-top: 100px;
  }
`;

interface BookInfoItemProps {
  kind?: string;
  value: string;
}

export function BookInfoItem({ kind, value }: BookInfoItemProps) {
  return (
    <InfoContainer>
      <Label>{kind}</Label>
      <InfoItem className="info">
        <span>{value}</span>
      </InfoItem>
    </InfoContainer>
  );
}
