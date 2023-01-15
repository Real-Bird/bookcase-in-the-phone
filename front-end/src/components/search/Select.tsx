import { ChangeEvent, ReactNode, RefObject } from "react";
import styled from "styled-components";

interface SelectCamerasProps {
  selectRef: RefObject<HTMLSelectElement>;
  children: ReactNode;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBlock = styled.select`
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 20rem;
  height: 3rem;
  padding: 0 4rem 0 1rem;
  color: #fff;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(
      to left,
      rgba(255, 255, 255, 0.3) 3em,
      rgba(255, 255, 255, 0.2) 3em
    );
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  option {
    color: inherit;
    background-color: #e1afef;
    outline: none;
    border: 0px solid transparent;
  }
  &:focus {
    outline: none;
  }
`;

export function Select({ selectRef, children, onChange }: SelectCamerasProps) {
  return (
    <SelectBlock ref={selectRef} onChange={onChange}>
      {children}
    </SelectBlock>
  );
}