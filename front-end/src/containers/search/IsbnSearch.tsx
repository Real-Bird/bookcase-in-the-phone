import { GetInfoReturn, getInfo, hasBookByIsbn } from "@api/bookcase";
import { Button, FloatingInput, PageLoading } from "@components/common";
import { BarcodeSearchProps } from "@containers/search";
import { useFetch } from "@libs/hooks";
import { FetchIsbnDataState, useIsbnDispatch } from "@libs/searchContextApi";
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
  const { setOutletBarcode } = useOutletContext<BarcodeSearchProps>();
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();
  const {
    state: hasBookState,
    loading: hasBookLoading,
    error: hasBookError,
    onFetching: hasBookFetching,
  } = useFetch<boolean>(() => hasBookByIsbn(barcode), true);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await hasBookFetching();
  };

  useEffect(() => {
    if (!barcode) {
      return;
    }
    if (hasBookState) {
      return navigate(`/books/${barcode}`);
    } else {
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
