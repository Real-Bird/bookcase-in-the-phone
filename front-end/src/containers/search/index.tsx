import { Button } from "@/components/common";
import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SearchNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 15px;
`;

const OutletBlock = styled.div`
  width: 100%;
  height: 13.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const HrLine = styled.hr`
  width: 100%;
  border: 1px solid rgba(223, 249, 251, 0.7);
`;

const DescriptionBlock = styled.div`
  width: 80%;
  text-align: center;
  line-height: 1.5;
  h2 {
    font-size: 2.25rem;
  }
  h3 {
    font-size: 1.75rem;
  }
`;

export interface BarcodeSearchProps {
  barcode: string;
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
}

export async function getInfo(barcode: string) {
  if (barcode.length < 13) return;
  const URL = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${
    import.meta.env.VITE_BOOK_SEARCH_API_KEY
  }&result_style=json&page_no=1&page_size=1&isbn=${barcode}`;
  const data = await (await fetch(URL, { method: "GET" })).json();
  if (!data || data.docs.length === 0) return;
  return data;
}

function SearchContainer() {
  const [barcode, setBarcode] = useState("");
  const FetchIsbnState = useIsbnState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!FetchIsbnState.isLoading) {
      navigate(`/result/${FetchIsbnState.EA_ISBN}`);
    }
  }, [FetchIsbnState]);
  return (
    <SearchBlock>
      <SearchNav>
        <Link to={"camera"}>
          <Button label="카메라 검색" />
        </Link>
        <Link to={"isbn"}>
          <Button label="ISBN 검색" />
        </Link>
      </SearchNav>
      <OutletBlock>
        <Outlet
          context={{
            barcode,
            setBarcode,
          }}
        />
      </OutletBlock>
      <HrLine />
      <DescriptionBlock>
        <h2>바코드를 읽으면</h2>
        <h2>책의 정보를 표시합니다!</h2>
        <h3>\(@^0^@)/</h3>
        <div>{barcode}</div>
      </DescriptionBlock>
    </SearchBlock>
  );
}

export default SearchContainer;
