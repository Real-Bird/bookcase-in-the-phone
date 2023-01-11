import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
import { Camera, Select } from "@components/search";
import useScanner from "@libs/useScanner";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
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

function SearchContainer() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const camera = useRef<HTMLVideoElement>(null);
  const selectCamera = useRef<HTMLSelectElement>(null);
  const { scan, scanning, stopStream, getCameras, getConstraints, getMedia } =
    useScanner();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [barcode, setBarcode] = useState("");
  const FetchIsbnState = useIsbnState();
  const FetchIsbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => await getMedia().then((stream) => setLocalStream(stream)))();
    getCameras(scan, setCameras);
    return () => {
      stopStream(localStream!);
    };
  }, []);
  useEffect(() => {
    if (!camera.current) return;
    if (localStream && camera.current) {
      scanning(localStream, camera.current, scan, setBarcode);
    }
    if (!FetchIsbnState.isLoading) {
      navigate(`/result/${FetchIsbnState.EA_ISBN}`);
    }
    return () => {
      stopStream(localStream!);
    };
  }, [localStream, FetchIsbnState]);

  useEffect(() => {
    if (!!barcode) {
      getInfo(barcode).then((data) =>
        FetchIsbnDispatch({ type: "SET_DATA", bookData: data.docs[0] })
      );
    }
  }, [barcode]);

  async function getInfo(barcode: string) {
    if (barcode.length < 13) return;
    const URL = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${
      import.meta.env.VITE_BOOK_SEARCH_API_KEY
    }&result_style=json&page_no=1&page_size=1&isbn=${barcode}`;
    const data = await (await fetch(URL, { method: "GET" })).json();
    if (!data || data.docs.length === 0) return;
    return data;
  }

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    await getMedia(e.target.value, getConstraints).then((stream) =>
      setLocalStream(stream)
    );
  };
  return (
    <SearchBlock>
      <Camera camera={camera} />
      <Select selectRef={selectCamera} onChange={handleChange}>
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </Select>
      <DescriptionBlock>
        <h2>바코드를 읽으면</h2>
        <h2>책의 정보를 표시합니다!</h2>
        <h3>\(@^0^@)/</h3>
        <div>{barcode}</div>
        <form>
          <input
            type={"text"}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="ISBN을 입력해주세요."
            value={barcode}
          />
          <button type="submit">검색</button>
        </form>
      </DescriptionBlock>
    </SearchBlock>
  );
}

export default SearchContainer;
