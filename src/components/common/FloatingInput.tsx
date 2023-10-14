import { ChangeEvent } from "react";
import styled from "styled-components";

const FloatingInputBlock = styled.label`
  position: relative;
  cursor: text;
  .input__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
    margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5);
    background: transparent;
    white-space: nowrap;
    transform: translateY(-10px);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
    color: #718093;
  }
  .input__field {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 3px solid currentColor;
    color: #718093;
    background: transparent;
    outline: none;
    appearance: none;
    font-size: 1.25rem;

    &:focus,
    &:not(:placeholder-shown) {
      border-color: #353b48;
      color: #353b48;
      & + .input__label {
        top: 0;
        transform: translate(0.25rem, -100%) scale(0.8);
        color: #353b48;
      }
    }
  }
`;

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FloatingInput({ label, value, onChange }: FloatingInputProps) {
  return (
    <FloatingInputBlock className="input">
      <input
        className="input__field"
        type="text"
        placeholder=" "
        value={value}
        onChange={onChange}
        maxLength={13}
        minLength={10}
      />
      <span className="input__label">{label}</span>
    </FloatingInputBlock>
  );
}
