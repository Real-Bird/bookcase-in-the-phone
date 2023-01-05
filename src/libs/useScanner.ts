import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { Dispatch, SetStateAction } from "react";

export default function useScanner() {
  const hints = new Map();
  const formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODABAR,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
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
    dispatch: Dispatch<SetStateAction<any>>
  ) {
    if (localStream && camera) {
      try {
        await scan.decodeFromStream(localStream, camera, (data, err) => {
          if (data) {
            dispatch(data.getText());
          } else {
            dispatch("");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return {
    scan,
    stopStream,
    scanning,
  };
}
