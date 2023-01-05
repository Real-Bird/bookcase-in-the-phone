import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";
import useScanner from "../libs/useScanner";

const Reader = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const Camera = useRef<HTMLVideoElement>(null);
  const selectCamera = useRef<HTMLSelectElement>(null);
  const { scan, scanning, stopStream } = useScanner();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [currentCamera, setCurrentCamera] = useState<string>();
  // const hints = new Map();
  // const formats = [
  //   BarcodeFormat.QR_CODE,
  //   BarcodeFormat.DATA_MATRIX,
  //   BarcodeFormat.CODE_128,
  //   BarcodeFormat.CODABAR,
  //   BarcodeFormat.EAN_13,
  //   BarcodeFormat.EAN_8,
  //   BarcodeFormat.CODE_39,
  //   BarcodeFormat.CODE_93,
  // ];
  // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  // const Scan = new BrowserMultiFormatReader(hints, 500);
  useEffect(() => {
    getMedia();
    getCameras();
    return () => {
      stopStream(localStream!);
    };
  }, []);
  useEffect(() => {
    if (!Camera.current) return;
    if (localStream && Camera.current) {
      scanning(localStream, Camera.current, scan, setText);
    }
    return () => {
      stopStream(localStream!);
    };
  }, [localStream]);

  async function getCameras() {
    const devices = await scan.listVideoInputDevices();
    setCameras(devices);
    if (localStream) {
      setCurrentCamera(localStream.getVideoTracks()[0].id);
    }
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
    // const initialConstrains = {
    //   audio: false,
    //   video: { facingMode: "user" },
    //   // video: true,
    // };
    // const cameraConstraints = {
    //   audio: false,
    //   video: { deviceId: { exact: deviceId } },
    // };
    navigator.mediaDevices
      .getUserMedia(getParams(selectCamera.current?.value))
      .then((stream) => {
        setLocalStream(stream);
      });
  }

  // const Scanning = async () => {
  //   // const t = await Scan.decodeOnce();
  //   console.log("scan");
  //   if (localStream && Camera.current) {
  //     try {
  //       const data = await Scan.decodeFromStream(
  //         localStream,
  //         Camera.current,
  //         (data, err) => {
  //           if (data) {
  //             setText(data.getText());
  //             // Scan.stopContinuousDecode();
  //           } else {
  //             setText("");
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // const Stop = () => {
  //   if (localStream) {
  //     const vidTrack = localStream.getVideoTracks();
  //     vidTrack.forEach((track) => {
  //       localStream.removeTrack(track);
  //     });
  //   }
  // };
  const [text, setText] = useState("");
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCamera(e.target.value);
    getMedia(e.target.value);
  };
  return (
    <div style={{ width: "100%", height: 200 }}>
      <video
        ref={Camera}
        id="video"
        style={{ objectFit: "cover", width: "100%", height: 200 }}
      />
      <select
        ref={selectCamera}
        value={selectCamera.current?.value}
        onChange={handleChange}
      >
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </select>
      <span>{text}</span>
    </div>
  );
};
export default Reader;
