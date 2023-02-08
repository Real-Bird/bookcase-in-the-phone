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
  const { scan, scanning, stopStream, getCameras, getConstraints, getMedia } =
    useScanner();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [currentCamera, setCurrentCamera] = useState("");
  const FetchIsbnState = useIsbnState();
  const isbnPatch = useIsbnDispatch();
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
    return () => stopStream(localStream!);
  }, [localStream, FetchIsbnState]);
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const stream = await getMedia(e.target.value, getConstraints);
    if (localStream) stopStream(localStream);
    setLocalStream(stream);
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
