import { FetchBookcaseState } from "@libs/bookcaseContextApi";
import { FetchIsbnDataState } from "@libs/searchContextApi";
import axios from "axios";
import axiosInstance from "@api/httpClient";
import { TOKEN_KEY } from "constants/auth";

export interface OpenSeojiData {
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

export type GetInfoReturn =
  | { ok: boolean; error: string; bookInfo: null }
  | { ok: boolean; bookInfo: FetchIsbnDataState; error: null };

export async function getInfo(barcode: string): Promise<GetInfoReturn> {
  if (Number.isNaN(+barcode))
    return {
      ok: false,
      error: "바코드 숫자를 입력해주세요.",
      bookInfo: null,
    };
  if (barcode.length < 10)
    return {
      ok: false,
      error: "바코드 길이가 너무 짧습니다: 10자 이상",
      bookInfo: null,
    };
  const URL = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${
    import.meta.env.VITE_BOOK_SEARCH_API_KEY as string
  }&result_style=json&page_no=1&page_size=1&isbn=${barcode}`;
  const { data } = await axios.get<OpenSeojiData>(URL);
  if (!data || data.docs.length === 0)
    return { ok: false, error: "해당 책 정보가 없습니다.", bookInfo: null };
  const bookInfo: FetchIsbnDataState = {
    author: data.docs[0].AUTHOR,
    ea_isbn: data.docs[0].EA_ISBN,
    publisher: data.docs[0].PUBLISHER,
    publisher_predate: data.docs[0].PUBLISH_PREDATE,
    subject: data.docs[0].SUBJECT,
    title: data.docs[0].TITLE,
    title_url: data.docs[0].TITLE_URL,
  };
  return { ok: true, bookInfo, error: null };
}

export interface SavedBookResponse {
  error: boolean;
  message: string;
}

export async function savedBookInfo(bookInfo: FetchIsbnDataState) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const { data } = await axiosInstance.post<SavedBookResponse>(
    "/bookcase/info",
    bookInfo
  );
  return data;
}

export interface BookListResponse {
  error: boolean;
  bookList: FetchBookcaseState;
  message: string;
}

export async function getBookList() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error, bookList },
  } = await axiosInstance.get<BookListResponse>("/bookcase/list");
  return { error, bookList };
}

export interface BookInfoResponse {
  error: boolean;
  bookInfo: FetchIsbnDataState;
  message: string;
}

export async function getBookInfoByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error, bookInfo },
  } = await axiosInstance.get<BookInfoResponse>(`/bookcase/info?isbn=${isbn}`);
  return { error, bookInfo };
}

type UpdateInfoBody = {
  review?: string;
  start_date?: string;
  end_date?: string;
};

export async function updateBookInfoByIsbn(isbn: string, body: UpdateInfoBody) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error },
  } = await axiosInstance.patch<BookInfoResponse>(
    `/bookcase/info?isbn=${isbn}`,
    { body }
  );
  if (error) {
    return { error, bookInfo: null };
  }
  return { error };
}

export interface DeleteBookResponse {
  error: boolean;
  bookInfo: FetchIsbnDataState;
  message: string;
}

export async function deleteBookInfoByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error, message },
  } = await axiosInstance.delete<DeleteBookResponse>(
    `/bookcase/info?isbn=${isbn}`
  );
  if (error) {
    return { error, message };
  }
  return { error, message };
}

export async function hasBookByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return false;
  }
  const {
    data: { hasBook },
  } = await axiosInstance.get<{ hasBook: boolean }>(
    `/bookcase/check?isbn=${isbn}`
  );
  return hasBook;
}
