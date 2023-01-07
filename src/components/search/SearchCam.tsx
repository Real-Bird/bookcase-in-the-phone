import { RefObject } from "react";
import styled from "styled-components";

interface SearchCamProps {
  camera: RefObject<HTMLVideoElement>;
}

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

function SearchCam({ camera }: SearchCamProps) {
  return (
    <CameraBlock>
      <video ref={camera} autoPlay playsInline></video>
    </CameraBlock>
  );
}

export default SearchCam;
