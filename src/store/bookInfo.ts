import { refactorBookInfo } from "@libs/refactorBookInfo";
import { SlicePattern } from "zustand";

enum BookInfoActions {
  SET_BOOK_INFO = "bookInfo/SetBookInfo",
  GET_BOOK_INFO = "bookInfo/GetBookInfo",
  INITIALIZE = "bookInfo/Initialize",
}

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

const createBookInfoSlice: SlicePattern<BookInfoSlice> = (set) => ({
  bookInfo: initialBookInfo,
  setBookInfo: (payload) =>
    set(
      (state) => {
        state.bookInfo = payload;
      },
      false,
      BookInfoActions.SET_BOOK_INFO
    ),
  getBookInfo: (payload) =>
    set(
      (state) => {
        state.bookInfo = refactorBookInfo(payload);
      },
      false,
      BookInfoActions.GET_BOOK_INFO
    ),
  initialize: () =>
    set(
      (state) => {
        state.bookInfo = initialBookInfo;
      },
      false,
      BookInfoActions.INITIALIZE
    ),
});

export type BookInfo = Bookcase.BookInfo;

export type BookInfoSlice = {
  bookInfo: BookInfo;
  setBookInfo: (payload: BookInfo) => void;
  getBookInfo: (payload: BookInfo) => void;
  initialize: () => void;
};

export default createBookInfoSlice;
