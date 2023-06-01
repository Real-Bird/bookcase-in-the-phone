import { RefObject, useEffect } from "react";
import styled from "styled-components";

interface SearchCamProps {
  camera: RefObject<HTMLVideoElement>;
  mediaStream: MediaStream | undefined;
}

const CameraBlock = styled.div`
  width: 100%;
  height: 150px;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export function Camera({ camera, mediaStream }: SearchCamProps) {
  useEffect(() => {
    if (!camera.current) return;
    camera.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);
  return (
    <CameraBlock>
      <video ref={camera} autoPlay playsInline></video>
    </CameraBlock>
  );
}
