import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  input {
    appearance: none;
    border: none;
    background: rgba(223, 249, 251, 0.7);
    color: green;
    font-family: "Gugi", cursive;
  }
`;

interface InputProps {
  type: string;
  label: string;
  onChange?: () => void;
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
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}
