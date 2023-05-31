import { useIsbnDispatch, useIsbnState } from "@libs/searchContextApi";
import { Camera, Select } from "@components/search";
import useScanner from "@libs/useScanner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInfo, hasBookByIsbn } from "@api/bookcase";

export default function CameraSearch() {
  const { barcode, cameras, camera, currentCamera, handleChange } =
    useScanner();
  const isbnPatch = useIsbnDispatch();
  const navigate = useNavigate();
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
  }, [barcode]);
  return (
    <>
      <Camera camera={camera} />
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
