import { BarcodeSearchProps, getInfo } from "@/containers/search";
import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
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
  const FetchIsbnState = useIsbnState();
  const FetchIsbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  useEffect(() => {
    (async () => await getMedia().then((stream) => setLocalStream(stream)))();
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

  useEffect(() => {
    if (!!barcode) {
      getInfo(barcode).then((data) =>
        FetchIsbnDispatch({ type: "SET_DATA", bookData: data.docs[0] })
      );
    }
  }, [barcode]);
  return (
    <>
      <Camera camera={camera} />
      <Select selectRef={selectCamera} onChange={handleChange}>
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </Select>
    </>
  );
}
