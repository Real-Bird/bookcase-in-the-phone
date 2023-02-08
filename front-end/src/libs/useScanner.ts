import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { Dispatch, SetStateAction } from "react";

type GetConstraints = (deviceId?: string) => {
  video: {
    deviceId: { exact: string } | undefined;
  };
  audio: false;
};

export default function useScanner() {
  const hints = new Map();
  const formats = [
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODABAR,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.ITF,
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

  const scan = new BrowserMultiFormatReader(hints, 500);

  function stopStream(localStream: MediaStream) {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks();
      videoTrack.forEach((track) => {
        localStream.removeTrack(track);
      });
    }
  }

  async function scanning(
    localStream: MediaStream,
    camera: HTMLVideoElement,
    scan: BrowserMultiFormatReader,
    dispatch: Dispatch<SetStateAction<string>>
  ) {
    if (localStream && camera) {
      try {
        await scan.decodeFromStream(localStream, camera, (data, err) => {
          if (data) {
            dispatch(data.getText());
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function getCameras(
    scan: BrowserMultiFormatReader,
    dispatchCameras: Dispatch<SetStateAction<MediaDeviceInfo[] | undefined>>
  ) {
    const devices = await scan.listVideoInputDevices();
    dispatchCameras(devices);
  }

  const getConstraints: GetConstraints = (deviceId) => {
    return {
      video: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        facingMode: { exact: "environment" },
      },
      audio: false,
    };
  };

  async function getMedia(deviceId?: string, constraints?: GetConstraints) {
    const initialConstrains = {
      video: { facingMode: { exact: "environment" } },
      audio: false,
    };
    return navigator.mediaDevices.getUserMedia(
      constraints ? constraints(deviceId) : initialConstrains
    );
  }

  return {
    scan,
    stopStream,
    scanning,
    getCameras,
    getConstraints,
    getMedia,
  };
}
