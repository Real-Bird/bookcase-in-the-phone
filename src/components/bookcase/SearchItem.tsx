import React, { ChangeEvent } from "react";
import styled from "styled-components";

const SearchItemBlock = styled.label`
  flex: 1;
  height: 100%;
  position: relative;
  input {
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    padding-left: 3.5rem;
    font-size: 1.25rem;
    border: none;
    appearance: none;
    outline: none;
    border-radius: 0.25rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3) 3rem,
      rgba(255, 255, 255, 0.2) 3rem
    );
    height: 100%;
    width: 100%;
  }
  svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 25%;
    left: 3%;
  }
`;

interface SearchItemProps {
  search: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: () => void;
}

export function SearchItem({ onChange, onKeyUp, search }: SearchItemProps) {
  return (
    <SearchItemBlock>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type={"search"}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={search}
      />
    </SearchItemBlock>
  );
}
