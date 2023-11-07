import { DecodeHintType } from "@zxing/library";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  BrowserCodeReader,
} from "@zxing/browser";
import { useRef, useState } from "react";

export const useScanner = () => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState("");
  const cameraRef = useRef<HTMLVideoElement>(null);
  const localStream = useRef<MediaStream | null>(null);
  const hints = new Map();
  const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_93];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  const scan = new BrowserMultiFormatReader(hints);

  const startStream = async () => {
    try {
      const devices = await BrowserCodeReader.listVideoInputDevices();
      const device = devices.slice(-1);
      const stream = await getMedia(device[0].deviceId);
      setCameras(device);
      setCurrentCamera(device[0].label);
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        localStream.current = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStream = () => {
    const stream = localStream.current;
    if (stream) {
      if (stream.getVideoTracks && stream.getAudioTracks) {
        stream.getVideoTracks().map((track) => {
          stream.removeTrack(track);
          track.stop();
        });
        stream.getAudioTracks().map((track) => {
          stream.removeTrack(track);
          track.stop();
        });
      } else {
        (stream as unknown as MediaStreamTrack).stop();
      }
    }
  };

  const scanBarcode = (setBarcode: (barcode: string) => void) => {
    if (localStream.current && cameraRef.current) {
      try {
        scan.decodeFromStream(
          localStream.current,
          cameraRef.current,
          (data) => {
            if (data) {
              setBarcode(data.getText());
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  async function getMedia(deviceId?: string) {
    const basedConstrains = {
      video: {
        facingMode: { exact: "environment" },
      },
      audio: false,
    };
    const media = await navigator.mediaDevices.getUserMedia(
      deviceId
        ? {
            ...basedConstrains,
            video: {
              ...basedConstrains.video,
              deviceId,
            },
          }
        : basedConstrains
    );

    return media;
  }

  return {
    cameras,
    cameraRef,
    currentCamera,
    localStream,
    startStream,
    stopStream,
    scanBarcode,
  };
};
