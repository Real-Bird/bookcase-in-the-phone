import { Button, FloatingInput } from "@components/common";
import { BarcodeSearchProps, getInfo } from "@containers/search";
import { useIsbnDispatch } from "@libs/searchContextApi";
import { FormEvent } from "react";
import { useOutletContext } from "react-router-dom";
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
// 9788935213689
export default function IsbnSearch() {
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  const FetchIsbnDispatch = useIsbnDispatch();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    getInfo(barcode).then((data) =>
      FetchIsbnDispatch({ type: "SET_DATA", bookData: data.docs[0] })
    );
  };

  return (
    <FormBlock onSubmit={onSubmit}>
      <FloatingInput
        label="ISBN을 입력해주세요"
        onChange={(e) => setBarcode(e.target.value)}
        value={barcode}
      />
      <Button type="submit" label="검색" />
    </FormBlock>
  );
}
