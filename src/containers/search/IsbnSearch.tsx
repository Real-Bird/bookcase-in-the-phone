import { GetInfoReturn, getInfo, hasBookByIsbn } from "@api/bookcase";
import { Button, FloatingInput } from "@components/common";
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
  const { setOutletBarcode, setStateError } =
    useOutletContext<BarcodeSearchProps>();
  const [barcode, setBarcode] = useState("");
  const isbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const { state: newInfoState, onFetching: newInfoFetching } =
    useFetch<GetInfoReturn>(() => getInfo(barcode), true);
  const {
    state: hasBookState,

    onFetching: hasBookFetching,
  } = useFetch<boolean>(() => hasBookByIsbn(barcode), true);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await hasBookFetching();
  };

  useEffect(() => {
    if (hasBookState) {
      return navigate(`/books/${barcode}`);
    } else if (hasBookState === false) {
      newInfoFetching();
    }
    if (!newInfoState?.ok && newInfoState?.error) {
      setStateError(newInfoState.error);
      return;
    }
    if (newInfoState?.ok) {
      isbnDispatch({
        type: "LOAD_DATA",
        bookInfo: newInfoState?.bookInfo as FetchIsbnDataState,
      });
      return navigate(`/result/${barcode}`);
    }
  }, [hasBookState, newInfoState?.ok]);
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
