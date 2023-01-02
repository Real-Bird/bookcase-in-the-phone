import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../Layout";

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

const CameraBlock = styled.div`
  width: 100%;
  height: 150px;
  video {
    width: 100%;
    height: 150px;
    object-fit: fill;
    transform: scaleX(-1);
  }
`;

const Select = styled.select`
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 20rem;
  height: 3rem;
  padding: 0 4rem 0 1rem;
  color: #fff;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(
      to left,
      rgba(255, 255, 255, 0.3) 3em,
      rgba(255, 255, 255, 0.2) 3em
    );
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  option {
    color: inherit;
    background-color: $option;
  }
  &:focus {
    outline: none;
  }
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

function SearchCam() {
  const camera = useRef<HTMLVideoElement>(null);
  const [isCam, setIsCam] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [currentCamera, setCurrentCamera] = useState<MediaStreamTrack>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  useEffect(() => {
    getMedia();
  }, [isCam]);

  async function getCameras() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    setCameras(devices.filter((device) => device.kind === "videoinput"));
    setCurrentCamera(stream?.getVideoTracks()[0]);
    setIsCam(true);
  }
  async function getMedia(deviceId?: string) {
    const initialConstrains = {
      audio: false,
      video: true,
    };
    const cameraConstraints = {
      audio: false,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      );
      setStream(currentStream);
      const { current } = camera;
      if (current && stream) {
        current.srcObject = stream;
      }
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout title="Search">
      <SearchBlock>
        <CameraBlock>
          <video ref={camera} autoPlay playsInline></video>
        </CameraBlock>
        <Select value={currentCamera?.label}>
          {cameras?.map((cam) => (
            <option key={cam.label} value={cam.deviceId}>
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
    </Layout>
  );
}

export default SearchCam;
