import { BarcodeSearchProps } from "@containers/search";
import { useIsbnState } from "@libs/searchContextApi";
import { DecodeHintType } from "@zxing/library";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  BrowserCodeReader,
} from "@zxing/browser";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function useScanner() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState("");
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  const FetchIsbnState = useIsbnState();
  const camera = useRef<HTMLVideoElement>(null);
  const hints = new Map();
  const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_93];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  const scan = new BrowserMultiFormatReader(hints);

  useEffect(() => {
    let mounted = true;
    try {
      if (mounted) {
        let deviceId: string = "";
        BrowserCodeReader.listVideoInputDevices()
          .then((devices) => {
            const device = devices.slice(-1);
            setCameras(devices.slice(-1));
            setCurrentCamera(device[0].label);
            deviceId = device[0].deviceId;
          })
          .then(async () => {
            const stream = await getMedia({
              video: {
                facingMode: { exact: "environment" },
                deviceId,
              },
              audio: false,
            });
            setLocalStream(stream);
          });
      }
    } catch (e) {
      console.error("initial error", e);
    }
    return () => {
      mounted = false;
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
  }, [localStream, FetchIsbnState]);

  function stopStream() {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(undefined);
    }
  }

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
  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    stopStream();
    const { value } = e.currentTarget;

    const selectedCamera = cameras.find((device) => device.label === value);

    if (selectedCamera) {
      const deviceIdConstrains = {
        video: { deviceId: { exact: selectedCamera.deviceId } },
        audio: false,
      };

      try {
        const stream = await getMedia(deviceIdConstrains);
        setLocalStream(stream);
        setCurrentCamera(selectedCamera.label);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  }

  return {
    barcode,
    cameras,
    camera,
    currentCamera,
    handleChange,
    localStream,
  };
}
