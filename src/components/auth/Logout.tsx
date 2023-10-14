import styled from "styled-components";

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #95a5a6;
  padding: 1rem 2rem;
  font-weight: 400;
  font-size: 1.5rem;
  color: #34495e;
  box-shadow: 8px 10px 10px 2px rgba(0, 0, 0, 0.5);
  gap: 20px;
  cursor: pointer;
  &:hover {
    background: #dcdde1;
  }
  &:active {
    background: #95a5a6;
  }
`;

interface LogoutProps {
  onClick: () => void;
}

export function Logout({ onClick }: LogoutProps) {
  return (
    <LogoutButton onClick={onClick}>
      <span>Logout</span>
    </LogoutButton>
  );
}
