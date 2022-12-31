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
`;

const CameraBlock = styled.div`
  width: 100%;
  height: 200px;
  video {
    width: 100%;
    height: 150px;
    object-fit: fill;
    transform: scaleX(-1);
  }
  select {
    margin: 0 25%;
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
    setCameras(devices.filter((device) => device.kind === "videoinput"));
    setCurrentCamera(stream?.getVideoTracks()[0]);
    setIsCam(true);
  }
  async function getMedia(deviceId?: string) {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
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
          <select value={currentCamera?.label}>
            {cameras?.map((cam) => (
              <option key={cam.label} value={cam.deviceId}>
                {cam.label}
              </option>
            ))}
          </select>
        </CameraBlock>
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
