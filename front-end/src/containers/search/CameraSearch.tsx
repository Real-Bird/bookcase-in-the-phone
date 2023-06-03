import { useIsbnDispatch } from "@libs/searchContextApi";
import { Camera, Select } from "@components/search";
import useScanner from "@libs/hooks/useScanner";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getInfo, hasBookByIsbn } from "@api/bookcase";
import { BarcodeSearchProps } from "@containers/search";

export default function CameraSearch() {
  const { barcode, cameras, camera, currentCamera, handleChange, localStream } =
    useScanner();
  const isbnPatch = useIsbnDispatch();
  const navigate = useNavigate();
  const { setBarcode } = useOutletContext<BarcodeSearchProps>();
  useEffect(() => {
    if (!!barcode) {
      Promise.all([getInfo(barcode), hasBookByIsbn(barcode)]).then(
        async ([bookData, hasBook]) => {
          if (!bookData) return;
          const { bookInfo } = bookData;
          (await isbnPatch)({
            type: "LOAD_DATA",
            bookInfo,
          });
          if (hasBook) {
            return navigate(`/books/${barcode}`);
          } else {
            return navigate(`/result/${barcode}`);
          }
        }
      );
    }
    return () => setBarcode("");
  }, [barcode]);
  return (
    <>
      <Camera camera={camera} mediaStream={localStream} />
      <Select onChange={handleChange} defaultValue={currentCamera}>
        {cameras?.map((cam) => (
          <option key={cam.deviceId} value={cam.label}>
            {cam.label}
          </option>
        ))}
      </Select>
    </>
  );
}
