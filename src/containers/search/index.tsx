import { Button } from "@components/common";
import { Dispatch, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import barcodeImage from "/barcode.png";
import { useScanner } from "@libs/hooks";

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

  .barcode {
    height: 2rem;
  }

  .error {
    height: 2rem;
    color: #fa3636;
  }
`;

const HrLine = styled.hr`
  width: 100%;
  border: 1px solid rgba(223, 249, 251, 0.7);
`;

const DescriptionBlock = styled.div`
  width: 80%;
  text-align: center;
  line-height: 1.5;
  position: relative;
  svg {
    position: absolute;
    right: 0;
    top: -0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    stroke-width: 2;
    cursor: help;
    &:hover {
      color: white;
    }
  }
  h2 {
    font-size: 130%;
  }
  h3 {
    font-size: 115%;
  }
  img {
    margin-top: 1rem;
    width: 12rem;
  }
  @media screen and (min-width: 500px) {
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    img {
      width: 20rem;
    }
  }
`;

export interface BarcodeSearchProps {
  outletBarcode: string;
  setOutletBarcode: Dispatch<string>;
  setStateError: Dispatch<string>;
  stopStream: () => void;
}

function SearchContainer() {
  const [outletBarcode, setOutletBarcode] = useState("");
  const [stateError, setStateError] = useState("");
  const [toggleQuestion, setToggleQuestion] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    barcode,
    cameras,
    cameraRef,
    currentCamera,
    localStream,
    stopStream,
    startStream,
    scanBarcode,
  } = useScanner();

  useEffect(() => {
    if (location.pathname.includes("camera")) {
      startStream();
    } else {
      stopStream();
    }
    return () => setOutletBarcode("");
  }, [location]);
  return (
    <SearchBlock>
      <SearchNav>
        <a>
          <Button
            onClick={() => {
              navigate("camera");
            }}
            label="카메라 검색"
          />
        </a>
        <a>
          <Button
            onClick={() => {
              navigate("isbn");
            }}
            label="ISBN 검색"
          />
        </a>
      </SearchNav>
      <OutletBlock>
        <Outlet
          context={{
            barcode,
            cameras,
            cameraRef,
            currentCamera,
            localStream,
            scanBarcode,
            outletBarcode,
            setOutletBarcode,
            setStateError,
          }}
        />
        {stateError ? (
          <div className="error">{stateError}</div>
        ) : (
          <div className="barcode">{outletBarcode}</div>
        )}
      </OutletBlock>
      <HrLine />
      <DescriptionBlock>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onMouseEnter={() => setToggleQuestion((prev) => !prev)}
          onMouseLeave={() => setToggleQuestion((prev) => !prev)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
        {toggleQuestion && <ExplainIsbn />}
        <h2>바코드 / ISBN으로 검색한</h2>
        <h2>책의 정보를 표시합니다!</h2>
        <h3>\(@^0^@)/</h3>
        <img src={barcodeImage} alt="barcode-image" />
      </DescriptionBlock>
    </SearchBlock>
  );
}

export default SearchContainer;

const ExplainIsbnBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(2.5rem, -6rem);
`;

const Bubble = styled.div`
  position: relative;
  width: 25rem;
  padding: 0px;
  background: rgba(223, 249, 251, 1);
  border-radius: 10px;
  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: rgba(223, 249, 251, 1) transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -15px;
    right: 35px;
  }
  div {
    text-align: justify;
    word-break: break-all;
    padding: 1rem 0.5rem;
    font-size: 0.8rem;
    strong {
      color: rgb(221, 94, 221);
      font-weight: bolder;
      font-size: 0.9rem;
    }
  }
`;

function ExplainIsbn() {
  return (
    <ExplainIsbnBox>
      <Bubble>
        <div>
          <strong>
            국제표준도서번호&#40;International Standard Book Number&#41;
          </strong>
          란, <br />전 세계의 각종 도서에 부여한 고유번호, 즉 책의
          주민등록번호입니다.
        </div>
      </Bubble>
    </ExplainIsbnBox>
  );
}
