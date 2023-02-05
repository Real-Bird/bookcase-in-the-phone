import { getUserToken } from "@api/auth";
import { FetchIsbnDataState } from "@libs/searchContextApi";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface OpenSeojiData {
  docs: {
    PUBLISHER: string;
    AUTHOR: string;
    TITLE_URL: string;
    EA_ISBN: string;
    SUBJECT: string;
    TITLE: string;
    PUBLISH_PREDATE: string;
  }[];
}

export async function getInfo(barcode: string) {
  if (barcode.length < 13) return;
  const URL = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${
    import.meta.env.VITE_BOOK_SEARCH_API_KEY
  }&result_style=json&page_no=1&page_size=1&isbn=${barcode}`;
  const { data } = await axios.get<OpenSeojiData>(URL);
  if (!data || data.docs.length === 0) return;
  const bookData = {
    author: data.docs[0].AUTHOR,
    ea_isbn: data.docs[0].EA_ISBN,
    publisher: data.docs[0].PUBLISHER,
    publisher_predate: data.docs[0].PUBLISH_PREDATE,
    subject: data.docs[0].SUBJECT,
    title: data.docs[0].TITLE,
    title_url: data.docs[0].TITLE_URL,
  };
  return { bookInfo: bookData };
}

export async function savedBookInfo(bookInfo: FetchIsbnDataState) {
  const token = getUserToken("BiPToken");
  if (!token) return console.log("not token");
  const { data } = await axios.post(
    `${SERVER_URL}/bookcase/info?token=${token}`,
    bookInfo,
    {
      withCredentials: true,
    }
  );
  return data;
}

export type BookListType = Pick<
  FetchIsbnDataState,
  | "title"
  | "author"
  | "translator"
  | "publisher"
  | "subject"
  | "title_url"
  | "ea_isbn"
>;

export interface BookListResponse {
  error: boolean;
  bookList: BookListType[];
  message: "string;";
}

export async function getBookList() {
  const token = getUserToken("BiPToken");
  const {
    data: { error, bookList },
  } = await axios.get<BookListResponse>(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/list?token=${token}`
  );
  return { error, bookList };
}

export interface BookInfoResponse {
  error: boolean;
  bookInfo: FetchIsbnDataState;
  message: "string;";
}

export async function getBookInfoByIsbn(isbn: string) {
  const token = getUserToken("BiPToken");
  try {
    const {
      data: { error, bookInfo },
    } = await axios.get<BookInfoResponse>(
      `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/bookcase/info?token=${token}&isbn=${isbn}`,
      { withCredentials: true }
    );
    return { error, bookInfo };
  } catch (e) {
    throw e;
  }
}

type UpdateInfoBody = {
  review?: string;
  start_date?: string;
  end_date?: string;
};

export async function updateBookInfoByIsbn(isbn: string, body: UpdateInfoBody) {
  const token = getUserToken("BiPToken");
  const {
    data: { error },
  } = await axios.patch<BookInfoResponse>(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { body },
    { withCredentials: true }
  );
  if (error) {
    return { error, bookInfo: null };
  }
  return { error };
}

export async function deleteBookInfoByIsbn(isbn: string) {
  const token = getUserToken("BiPToken");
  const {
    data: { error, message },
  } = await axios.delete(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { withCredentials: true }
  );
  if (error) {
    return { error, message };
  }
  return { error, message };
}

export async function hasBookByIsbn(isbn: string) {
  const token = getUserToken("BiPToken");
  const {
    data: { hasBook },
  } = await axios.get<{ hasBook: boolean }>(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/check?token=${token}&isbn=${isbn}`,
    { withCredentials: true }
  );
  return hasBook;
}
