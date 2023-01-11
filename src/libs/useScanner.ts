import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { Dispatch, SetStateAction, useState } from "react";

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
    // dispatchCameras(devices);
    dispatchCameras(
      devices.filter((device) => device.label.includes("DroidCam"))
    );
  }

  const getConstraints: GetConstraints = (deviceId) => {
    return {
      video: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
      },
      audio: false,
    };
  };

  async function getMedia(deviceId?: string, constraints?: GetConstraints) {
    // const initialConstrains = { video: true, audio: false };
    // return navigator.mediaDevices.getUserMedia(
    //   constraints ? constraints(deviceId) : initialConstrains
    // );
    const initialConstrains = {
      video: {
        deviceId: {
          exact:
            "6a9b759d4a860d028cc76a267ccee3b34074c79b81b93fd5eaf7f550870b2c50",
        },
      },
      audio: false,
    };
    return navigator.mediaDevices.getUserMedia(initialConstrains);
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
