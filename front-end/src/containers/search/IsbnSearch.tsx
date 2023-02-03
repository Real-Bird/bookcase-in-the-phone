import { getBookInfoByIsbn, getInfo, hasBookByIsbn } from "@api/bookcase";
import { Button, FloatingInput } from "@components/common";
import { BarcodeSearchProps } from "@containers/search";
import { useIsbnDispatch } from "@libs/searchContextApi";
import { FormEvent } from "react";
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
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  const isbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const bookData = await getInfo(barcode);
    if (!bookData) return;
    const { bookInfo } = bookData;
    isbnDispatch({
      type: "LOAD_DATA",
      bookInfo,
    });
    const hasBook = await hasBookByIsbn(bookInfo.ea_isbn);
    if (hasBook) return navigate(`/books/${barcode}`);
    return navigate(`/result/${barcode}`);
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
