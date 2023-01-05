import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    height: 100%;
    object-fit: cover;
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
  let stream: MediaStream;
  const [currentCamera, setCurrentCamera] = useState<string>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const refSelectVideo = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    (async () => {
      await getMedia();
    })();
    return () => Stop();
  }, [isCam]);

  async function getCameras(stream: MediaStream) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setCameras(devices.filter((device) => device.kind === "videoinput"));
    if (stream.getVideoTracks()[0]) {
      setCurrentCamera(stream.getVideoTracks()[0].id);
    }
    setIsCam(true);
  }

  const getParams = (video: any) => {
    return {
      video: {
        deviceId: video ? { exact: video } : undefined,
      },
      audio: false,
    };
  };

  async function getMedia(deviceId?: string) {
    const initialConstrains = {
      audio: false,
      video: { facingMode: "user" },
      // video: true,
    };
    const cameraConstraints = {
      audio: false,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      // stream = await navigator.mediaDevices.getUserMedia(
      //   deviceId ? cameraConstraints : initialConstrains
      // );
      stream = await navigator.mediaDevices.getUserMedia(
        getParams(refSelectVideo.current?.value)
      );
      console.log(stream.getTracks());
      const { current } = camera;
      if (current && stream) {
        current.srcObject = stream;
      }
      if (!deviceId) {
        await getCameras(stream);
      } else {
        setCurrentCamera(deviceId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const Stop = () => {
    if (stream) {
      const vidTrack = stream.getVideoTracks();
      vidTrack.forEach((track) => {
        stream.removeTrack(track);
      });
    }
  };

  async function handleCameraChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentCamera(e.target.value);
    getMedia(e.target.value);
  }
  return (
    <Layout title="Search">
      <SearchBlock>
        <CameraBlock>
          <video ref={camera} autoPlay playsInline></video>
        </CameraBlock>
        <Select ref={refSelectVideo} onChange={handleCameraChange}>
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
    </Layout>
  );
}

export default SearchCam;
