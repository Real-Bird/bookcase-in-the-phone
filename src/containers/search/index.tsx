import { Camera, Select } from "@components/search";
import useScanner from "@libs/useScanner";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    return () => {
      stopStream(localStream!);
    };
  }, [localStream]);

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
      </DescriptionBlock>
    </SearchBlock>
  );
}

export default SearchContainer;
