import { Camera, Select } from "@components/search";
import { useFetch } from "@libs/hooks";
import { RefObject, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CheckedExistedBookResponse, hasBookByIsbn } from "@api/bookcase";
import { BarcodeSearchProps } from "@containers/search";
import { BookcaseActionTypes, useBookcaseDispatch } from "@store/bookcase";

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
  const bookcaseDispatch = useBookcaseDispatch();
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
  const { state: hasBookState, onFetching: hasBookFetching } = useFetch<
    CheckedExistedBookResponse | undefined
  >(() => hasBookByIsbn(barcode), true);

  useEffect(() => {
    if (!cameraRef.current || !localStream) return;
    scanBarcode(localStream, cameraRef);
  }, [localStream]);

  useEffect(() => {
    if (barcode) {
      setOutletBarcode(barcode);
      hasBookFetching();

      if (hasBookState && hasBookState.hasBook) {
        return navigate(`/books/${barcode}`);
      } else if (hasBookState?.error) {
        setStateError(hasBookState.message ?? "Something was wrong!");
        return;
      } else if (hasBookState?.bookInfo) {
        bookcaseDispatch({
          type: BookcaseActionTypes.LOAD_BOOK,
          payload: { book: hasBookState.bookInfo },
        });
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
