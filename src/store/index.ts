import createBookInfoSlice, { BookInfoSlice } from "@store/bookInfo";
import createBookcaseSlice, { BookcaseSlice } from "@store/bookcase";
import createUserSlice, { UserSlice } from "@store/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const BoundStore = create<BoundSlice>()(
  devtools(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createBookInfoSlice(...a),
      ...createBookcaseSlice(...a),
    })),
    { name: "bip-bound-store" }
  )
);

type BoundSlice = UserSlice & BookcaseSlice & BookInfoSlice;

export default BoundStore;
