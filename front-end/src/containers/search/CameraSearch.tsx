import { BarcodeSearchProps, getInfo } from "@containers/search";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { Camera, Select } from "@components/search";
import useScanner from "@libs/useScanner";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function CameraSearch() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const camera = useRef<HTMLVideoElement>(null);
  const selectCamera = useRef<HTMLSelectElement>(null);
  const { scan, scanning, stopStream, getCameras, getConstraints, getMedia } =
    useScanner();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [currentCamera, setCurrentCamera] = useState("");
  const FetchIsbnState = useIsbnState();
  const FetchIsbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  useEffect(() => {
    (async () =>
      await getMedia().then(async (stream) => {
        const deviceId = await getCurrentCamId(stream.getTracks()[0].label);
        setCurrentCamera(deviceId);
        setLocalStream(stream);
      }))();
    getCameras(scan, setCameras);
    return () => {
      stopStream(localStream!);
    };
  }, []);
  useEffect(() => {
    if (!camera.current) return;
    if (localStream && camera.current) {
      scanning(localStream, camera.current, scan, setBarcode);
    }
    if (!FetchIsbnState.isLoading) {
      navigate(`/result/${FetchIsbnState.EA_ISBN}`);
    }
    return () => {
      stopStream(localStream!);
    };
  }, [localStream, FetchIsbnState]);
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    await getMedia(e.target.value, getConstraints).then((stream) =>
      setLocalStream(stream)
    );
  };
  const getCurrentCamId = async (label: string) => {
    const deviceId = await navigator.mediaDevices
      .enumerateDevices()
      .then((device) => {
        return device.filter((d) => d.label === label)[0].deviceId;
      });
    return deviceId;
  };
  useEffect(() => {
    if (!!barcode) {
      (async () => {
        const data = await getInfo(barcode, navigate);
        return FetchIsbnDispatch({ type: "SET_DATA", bookData: data.docs[0] });
      })();
    }
  }, [barcode]);
  return (
    <>
      <Camera camera={camera} />
      <Select
        selectRef={selectCamera}
        onChange={handleChange}
        defaultValue={currentCamera}
      >
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </Select>
    </>
  );
}
