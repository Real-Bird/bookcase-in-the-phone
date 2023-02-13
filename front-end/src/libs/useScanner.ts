import { BarcodeSearchProps } from "@containers/search";
import { useIsbnState } from "@libs/searchContextApi";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function useScanner() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [currentCamera, setCurrentCamera] = useState("");
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  const FetchIsbnState = useIsbnState();
  const camera = useRef<HTMLVideoElement>(null);
  const hints = new Map();
  const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_93];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

  const scan = new BrowserMultiFormatReader(hints, 500);

  useEffect(() => {
    Promise.all([getMedia(), scan.listVideoInputDevices()])
      .then(([stream, devices]) => {
        const deviceId = devices.filter(
          (d) => d.label === stream.getTracks()[0].label
        )[0].deviceId;
        setLocalStream(stream);
        setCameras(devices);
        setCurrentCamera(deviceId);
      })
      .catch(async (e) => {
        const nextConstrains: MediaStreamConstraints = {
          video: true,
          audio: false,
        };
        const stream = await getMedia(nextConstrains);
        const devices = await scan.listVideoInputDevices();
        const deviceId = devices.filter(
          (d) => d.label === stream.getTracks()[0].label
        )[0].deviceId;
        setLocalStream(stream);
        setCameras(devices);
        setCurrentCamera(deviceId);
      });
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    if (!camera.current) return;
    if (localStream && camera.current) {
      try {
        scan.decodeFromStream(localStream, camera.current, (data, err) => {
          if (data) {
            setBarcode(data.getText());
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    return () => stopStream();
  }, [localStream, FetchIsbnState]);

  function stopStream() {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks();
      videoTrack.forEach((track) => {
        localStream.removeTrack(track);
      });
    }
  }

  async function getMedia(constraints?: MediaStreamConstraints) {
    const initialConstrains: MediaStreamConstraints = {
      video: { facingMode: { exact: "environment" } },
      audio: false,
    };
    const media = await navigator.mediaDevices.getUserMedia(
      constraints ? constraints : initialConstrains
    );
    return media;
  }
  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    stopStream();
    const { value } = e.target;
    const deviceIdConstrains: MediaStreamConstraints = {
      video: { deviceId: { exact: value } },
      audio: false,
    };
    const stream = await getMedia(deviceIdConstrains);
    setLocalStream(stream);
  }

  return {
    barcode,
    cameras,
    camera,
    currentCamera,
    handleChange,
  };
}
