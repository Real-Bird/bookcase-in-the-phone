import { CheckedExistedBookResponse, hasBookByIsbn } from "@api/bookcase";
import { Button, FloatingInput } from "@components/common";
import { BarcodeSearchProps } from "@containers/search";
import { useFetch } from "@libs/hooks";
import { useBookInfoDispatch } from "@store/selectors";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

const FormBlock = styled.form`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default function IsbnSearch() {
  const { setOutletBarcode, setStateError } =
    useOutletContext<BarcodeSearchProps>();
  const [barcode, setBarcode] = useState("");
  const { getBookInfo } = useBookInfoDispatch();
  const navigate = useNavigate();
  const { state: hasBookState, onFetching: hasBookFetching } = useFetch<
    CheckedExistedBookResponse | undefined
  >(() => hasBookByIsbn(barcode), true);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await hasBookFetching();
  };

  useEffect(() => {
    if (hasBookState && hasBookState.hasBook) {
      return navigate(`/books/${barcode}`);
    } else if (hasBookState?.error) {
      setStateError(hasBookState.message ?? "Something was wrong!");
      return;
    } else if (hasBookState?.bookInfo) {
      getBookInfo(hasBookState.bookInfo);
      return navigate(`/result/${barcode}`);
    }
  }, [hasBookState]);
  return (
    <FormBlock onSubmit={onSubmit}>
      <FloatingInput
        label="ISBN을 입력해주세요"
        onChange={(e) => {
          setBarcode(e.target.value);
          setOutletBarcode(e.target.value);
        }}
        value={barcode}
      />
      <Button type="submit" label="검색" />
    </FormBlock>
  );
}
