import styled from "styled-components";

const ButtonContainer = styled.button`
  background: rgba(223, 249, 251, 0.9);
  width: 12rem;
  height: 3rem;
  border-radius: 100px;
  box-shadow: rgba(223, 249, 251, 0.2) 0 -25px 18px -14px inset,
    rgba(223, 249, 251, 0.15) 0 1px 2px, rgba(223, 249, 251, 0.15) 0 2px 4px,
    rgba(223, 249, 251, 0.15) 0 4px 8px, rgba(223, 249, 251, 0.15) 0 8px 16px,
    rgba(223, 249, 251, 0.15) 0 16px 32px;
  cursor: pointer;
  display: inline-block;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(223, 249, 251, 0.35) 0 -25px 18px -14px inset,
      rgba(223, 249, 251, 0.25) 0 1px 2px, rgba(223, 249, 251, 0.25) 0 2px 4px,
      rgba(223, 249, 251, 0.25) 0 4px 8px, rgba(223, 249, 251, 0.25) 0 8px 16px,
      rgba(223, 249, 251, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
`;

const Label = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
`;

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  [key: string]: any;
}

export function Button({
  label,
  onClick,
  color = "green",
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer {...rest} onClick={onClick}>
      <Label color={color}>{label}</Label>
    </ButtonContainer>
  );
}
