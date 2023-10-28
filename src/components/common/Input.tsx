import { ChangeEvent } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  input {
    appearance: none;
    border: none;
    background: rgba(223, 249, 251, 0.7);
    color: green;
    font-family: "Gugi", cursive;
    flex: 1;
  }
`;

interface InputProps {
  type: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  placeholder?: string;
}

export function Input({
  label,
  onChange,
  type,
  name,
  value,
  placeholder,
}: InputProps) {
  const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <InputContainer>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        max={localeFormatter.format(new Date())}
      />
    </InputContainer>
  );
}
