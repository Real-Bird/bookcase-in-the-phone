import { FetchIsbnDataState, useIsbnDispatch } from "@libs/searchContextApi";
import { Camera, Select } from "@components/search";
import { useFetch } from "@libs/hooks";
import { RefObject, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GetInfoReturn, getInfo, hasBookByIsbn } from "@api/bookcase";
import { BarcodeSearchProps } from "@containers/search";

interface CameraSearchProps extends BarcodeSearchProps {
  barcode: string;
  cameraRef: RefObject<HTMLVideoElement>;
  cameras: MediaDeviceInfo[];
  currentCamera: string;
  scanBarcode: (
    localStream: MediaStream,
    cameraRef: RefObject<HTMLVideoElement>
  ) => void;
  localStream: MediaStream | undefined;
}

export default function CameraSearch() {
  const isbnDispatch = useIsbnDispatch();
  const navigate = useNavigate();
  const {
    setOutletBarcode,
    setStateError,
    barcode,
    cameraRef,
    cameras,
    currentCamera,
    localStream,
    scanBarcode,
  } = useOutletContext<CameraSearchProps>();
  const {
    state: hasBookState,
    loading: hasBookLoading,
    error: hasBookError,
    onFetching: hasBookFetching,
  } = useFetch<boolean>(() => hasBookByIsbn(barcode), true);

  useEffect(() => {
    if (!cameraRef.current || !localStream) return;
    scanBarcode(localStream, cameraRef);
  }, [localStream]);

  useEffect(() => {
    if (!!barcode) {
      setOutletBarcode(barcode);
      hasBookFetching();

      if (hasBookState) {
        return navigate(`/books/${barcode}`);
      } else {
        return navigate(`/result/${barcode}`);
      }
    }
    return () => setOutletBarcode("");
  }, [barcode, hasBookState]);

  return (
    <>
      <Camera camera={cameraRef} />
      <Select defaultValue={currentCamera}>
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.label}>
            {cam.label}
          </option>
        ))}
      </Select>
    </>
  );
}
