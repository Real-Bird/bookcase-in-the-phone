import { refactorBookInfo } from "@libs/refactorBookInfo";
import { SlicePattern, create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialBookInfo: BookInfo = {
  author: "",
  ea_isbn: "",
  end_date: "",
  publisher: "",
  publisher_predate: "",
  review: "",
  start_date: "",
  subject: "",
  title: "",
  title_url: "",
  translator: "",
};

const createBookcaseSlice: SlicePattern<BookcaseSlice, BookInfoSlice> = (
  set
) => ({
  bookcase: [],
  setBookcase: (payload) =>
    set((state) => {
      state.bookcase = payload;
    }),
});

const createBookInfoSlice: SlicePattern<BookInfoSlice, BookcaseSlice> = (
  set
) => ({
  bookInfo: initialBookInfo,
  setBookInfo: (payload) =>
    set((state) => {
      state.bookInfo = payload;
    }),
  getBookInfo: (payload) =>
    set((state) => {
      state.bookInfo = refactorBookInfo(payload);
    }),
  initialize: () =>
    set((state) => {
      state.bookInfo = initialBookInfo;
    }),
});

const BookcaseBoundStore = create<BookcaseSlice & BookInfoSlice>()(
  devtools(
    immer((...a) => ({
      ...createBookcaseSlice(...a),
      ...createBookInfoSlice(...a),
    })),
    { name: "bookcase-bound-store" }
  )
);

export const useBookcaseState = () =>
  BookcaseBoundStore((state) => state.bookcase);
export const useBookcaseDispatch = () =>
  BookcaseBoundStore((state) => ({ setBookcase: state.setBookcase }));

export const useBookInfoState = () =>
  BookcaseBoundStore((state) => state.bookInfo);
export const useBookInfoDispatch = () =>
  BookcaseBoundStore((state) => ({
    setBookInfo: state.setBookInfo,
    getBookInfo: state.getBookInfo,
    initBookInfo: state.initialize,
  }));

export type BookInfo = Bookcase.BookInfo;
export type BookcaseItemInfo = Bookcase.BookcaseItemInfo;

type BookcaseSlice = {
  bookcase: BookcaseItemInfo[];
  setBookcase: (payload: BookcaseItemInfo[]) => void;
};

type BookInfoSlice = {
  bookInfo: BookInfo;
  setBookInfo: (payload: BookInfo) => void;
  getBookInfo: (payload: BookInfo) => void;
  initialize: () => void;
};
