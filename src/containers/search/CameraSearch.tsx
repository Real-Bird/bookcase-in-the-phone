import { Camera, Select } from "@components/search";
import { useFetch, useScanner } from "@libs/hooks";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CheckedExistedBookResponse, hasBookByIsbn } from "@api/bookcase";
import { BarcodeSearchProps } from "@containers/search";
import { useBookInfoDispatch } from "@store/selectors";

export default function CameraSearch() {
  const { getBookInfo } = useBookInfoDispatch();
  const navigate = useNavigate();
  const {
    setOutletBarcode,
    setStateError,
    outletBarcode: barcode,
  } = useOutletContext<BarcodeSearchProps>();
  const { state: hasBookState, onFetching: hasBookFetching } = useFetch<
    CheckedExistedBookResponse | undefined
  >(() => hasBookByIsbn(barcode), true);
  const {
    cameras,
    cameraRef,
    currentCamera,
    localStream,
    stopStream,
    startStream,
    scanBarcode,
  } = useScanner();

  useEffect(() => {
    if (!cameraRef.current || !localStream.current) return;
    scanBarcode(setOutletBarcode);
  }, [localStream]);

  useEffect(() => {
    if (barcode) {
      hasBookFetching();

      if (hasBookState && hasBookState.hasBook) {
        return navigate(`/books/${barcode}`);
      } else if (hasBookState?.error) {
        setStateError(hasBookState.message ?? "Something was wrong!");
        return;
      } else if (hasBookState?.bookInfo) {
        getBookInfo(hasBookState.bookInfo);
        return navigate(`/result/${barcode}`);
      }
    }
  }, [barcode, hasBookState]);

  useEffect(() => {
    startStream();
    return () => {
      stopStream();
      setOutletBarcode("");
    };
  }, []);

  return (
    <>
      <Camera camera={cameraRef} />
      <Select defaultValue={currentCamera}>
        {cameras?.map((cam, idx) => (
          <option key={`${cam.deviceId} ${idx}`} value={cam.label}>
            {cam.label}
          </option>
        ))}
      </Select>
    </>
  );
}
