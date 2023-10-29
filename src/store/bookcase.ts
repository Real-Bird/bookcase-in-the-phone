import { setSubject } from "@libs/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum BookcaseActionTypes {
  SET_BOOKCASE = "SET_BOOKCASE",
  LOAD_BOOK = "LOAD_BOOK",
  SET_BOOK = "SET_BOOK",
  INITIALIZE_BOOK = "INITIALIZE_BOOK",
}

const initialBook: Bookcase.BookInfo = {
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

const dispatchReducer = (
  state: BookcaseState,
  action: BookcaseAction
): BookcaseState => {
  if (
    action.payload &&
    action.payload.bookcase &&
    action.payload.bookcase.length > 0
  ) {
    switch (action.type) {
      case BookcaseActionTypes.SET_BOOKCASE: {
        return { ...state, bookcase: action.payload.bookcase };
      }
      default: {
        throw new Error("Can not find action's type");
      }
    }
  } else if (action.payload && action.payload.book) {
    switch (action.type) {
      case BookcaseActionTypes.LOAD_BOOK: {
        const bookInfo = action.payload.book;
        const authorReg = / ?(지은이|지음|저자) ?[:]? ?/g;
        const translatorReg = /[ ]?(옮김)[: ]*|(옮긴이)[: ]+/g;
        const replaceWriter = bookInfo.author.replace(authorReg, "");
        const [author, rest] = replaceWriter.split(";");
        const translator =
          rest && rest.includes("옮") ? rest.replace(translatorReg, "") : "-";
        const replaceDate = (bookInfo.publisher_predate ?? "").replace(
          /(\d{4})(\d{2})(\d{2})/g,
          "$1-$2-$3"
        );
        const title = bookInfo.title.replace(/\(([\s\S]*)\) ?/g, "");
        const subject = setSubject(bookInfo.subject);
        return {
          ...state,
          book: {
            ...state.book,
            publisher: bookInfo.publisher,
            author: author,
            translator: translator ? translator : "",
            title_url: bookInfo.title_url,
            ea_isbn: bookInfo.ea_isbn,
            subject,
            title,
            publisher_predate: replaceDate,
          },
        };
      }
      case BookcaseActionTypes.SET_BOOK: {
        const bookInfo = action.payload.book;
        return { ...state, book: { ...bookInfo } };
      }
      default: {
        throw new Error("Can not find action's type");
      }
    }
  } else {
    switch (action.type) {
      case BookcaseActionTypes.INITIALIZE_BOOK: {
        return { ...state, book: initialBook };
      }
      default: {
        throw new Error("Can not find action's type");
      }
    }
  }
};

const bookcaseStore = create<BookcaseState & BookcaseDispatch>()(
  devtools(
    (set) => ({
      bookcase: [],
      book: initialBook,
      dispatch: (action) => set((state) => dispatchReducer(state, action)),
    }),
    { name: "bookcase" }
  )
);

export const useBookcaseState = () =>
  bookcaseStore((state) => ({
    book: state.book,
    bookcase: state.bookcase,
  }));

export const useBookcaseDispatch = () =>
  bookcaseStore((state) => state.dispatch);

type BookcaseState = {
  bookcase: Bookcase.BookcaseItemInfo[];
  book: Bookcase.BookInfo;
};

type BookcaseDispatch = {
  dispatch: (action: BookcaseAction) => void;
};

type BookcaseAction = {
  type: BookcaseActionTypes;
  payload?: {
    bookcase?: BookcaseState["bookcase"];
    book?: BookcaseState["book"];
  };
};
