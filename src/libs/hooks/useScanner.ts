import { DecodeHintType } from "@zxing/library";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  BrowserCodeReader,
} from "@zxing/browser";
import { RefObject, useRef, useState } from "react";

export const useScanner = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState("");
  const [barcode, setBarcode] = useState("");
  const cameraRef = useRef<HTMLVideoElement>(null);
  const hints = new Map();
  const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_93];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  const scan = new BrowserMultiFormatReader(hints);

  const startStream = async () => {
    try {
      const devices = await BrowserCodeReader.listVideoInputDevices();
      const device = devices.slice(-1);
      const stream = await getMedia({
        video: {
          facingMode: { exact: "environment" },
          deviceId: device[0].deviceId,
        },
      });
      setCameras(device);
      setCurrentCamera(device[0].label);
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStream = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(undefined);
    }
  };

  const scanBarcode = (
    localStream: MediaStream,
    cameraRef: RefObject<HTMLVideoElement>
  ) => {
    if (localStream && cameraRef.current) {
      try {
        scan.decodeFromStream(localStream, cameraRef.current, (data) => {
          if (data) {
            setBarcode(data.getText());
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function getMedia(constraints?: MediaStreamConstraints) {
    const initialConstrains: MediaStreamConstraints = {
      video: {
        facingMode: { exact: "environment" },
      },
      audio: false,
    };
    const media = await navigator.mediaDevices.getUserMedia(
      constraints ? constraints : initialConstrains
    );

    return media;
  }

  return {
    barcode,
    cameras,
    cameraRef,
    currentCamera,
    localStream,
    startStream,
    stopStream,
    scanBarcode,
  };
};
