import { BarcodeSearchProps } from "@containers/search";
import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { Camera, Select } from "@components/search";
import useScanner from "@libs/useScanner";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getInfo, hasBookByIsbn } from "@api/bookcase";

export default function CameraSearch() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const camera = useRef<HTMLVideoElement>(null);
  const selectCamera = useRef<HTMLSelectElement>(null);
  const { scan, scanning, stopStream, getCameras, getMedia } = useScanner();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [currentCamera, setCurrentCamera] = useState("");
  const FetchIsbnState = useIsbnState();
  const isbnPatch = useIsbnDispatch();
  const navigate = useNavigate();
  const { barcode, setBarcode } = useOutletContext<BarcodeSearchProps>();
  useEffect(() => {
    (async () => {
      try {
        const stream = await getMedia();
        setLocalStream(stream);
        const deviceId = await getCurrentCamId(stream.getTracks()[0].label);
        setCurrentCamera(deviceId);
      } catch (e) {
        const nextConstrains: MediaStreamConstraints = {
          video: true,
          audio: false,
        };
        const stream = await getMedia(nextConstrains);
        setLocalStream(stream);
        const deviceId = await getCurrentCamId(stream.getTracks()[0].label);
        setCurrentCamera(deviceId);
      }
    })();
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
    return () => stopStream(localStream!);
  }, [localStream, FetchIsbnState]);
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const deviceIdConstrains: MediaStreamConstraints = {
      video: { deviceId: { exact: value } },
      audio: false,
    };
    try {
      const stream = await getMedia(deviceIdConstrains);
      console.log(stream);
      setLocalStream(stream);
    } catch (e) {
      console.error("change device Error : ", e);
      const nextDeviceIdConstrains: MediaStreamConstraints = {
        video: { deviceId: { exact: value }, facingMode: "environment" },
        audio: false,
      };
      const stream = await getMedia(nextDeviceIdConstrains);
      console.warn(stream);
      setLocalStream(stream);
    }
  };
  const getCurrentCamId = async (label: string) => {
    const deviceId = await navigator.mediaDevices.enumerateDevices();
    return deviceId.filter((d) => d.label === label)[0].deviceId;
  };
  useEffect(() => {
    if (!!barcode) {
      (async () => {
        const bookData = await getInfo(barcode);
        if (!bookData) return;
        const { bookInfo } = bookData;
        isbnPatch({
          type: "LOAD_DATA",
          bookInfo,
        });
        const hasBook = await hasBookByIsbn(bookInfo.ea_isbn);
        if (hasBook) return navigate(`/books/${barcode}`);
        return navigate(`/result/${barcode}`);
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
