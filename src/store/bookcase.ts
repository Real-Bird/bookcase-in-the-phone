import { SlicePattern } from "zustand";

enum BookcaseActions {
  SET_BOOKCASE = "bookcase/SetBookcase",
}

const createBookcaseSlice: SlicePattern<BookcaseSlice> = (set) => ({
  bookcase: [],
  setBookcase: (payload) =>
    set(
      (state) => {
        state.bookcase = payload;
      },
      false,
      BookcaseActions.SET_BOOKCASE
    ),
});

export type BookcaseItemInfo = Bookcase.BookcaseItemInfo;

export type BookcaseSlice = {
  bookcase: BookcaseItemInfo[];
  setBookcase: (payload: BookcaseItemInfo[]) => void;
};

export default createBookcaseSlice;
