import { RefObject, useEffect, useState } from "react";

type isWantedSize = boolean;
type SizeProps = number;

export default function useWindowSize(ref: RefObject<Element>) {
  const [changeSize, setChangeSize] = useState<isWantedSize>(false);
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    if (typeof window !== undefined && ref.current) {
      setChangeSize(ref.current?.clientWidth < ref.current?.scrollWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, ref.current]);
  return changeSize;
}
