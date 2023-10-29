import { FetchBookcaseState } from "@libs/bookcaseContextApi";
import { FetchIsbnDataState } from "@libs/searchContextApi";
import axios from "axios";
import { TOKEN_KEY } from "constants/auth";

const SERVER_URL = import.meta.env.VITE_REACT_APP_API_URL;

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
    import.meta.env.VITE_BOOK_SEARCH_API_KEY
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

export async function savedBookInfo(bookInfo: FetchIsbnDataState) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  if (!token) return console.log("not token");
  const { data } = await axios.post(`${SERVER_URL}/bookcase/info`, bookInfo, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export interface BookListResponse {
  error: boolean;
  bookList: FetchBookcaseState;
  message: "string;";
}

export async function getBookList() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error, bookList },
  } = await axios.get<BookListResponse>(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/list`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return { error, bookList };
}

export interface BookInfoResponse {
  error: boolean;
  bookInfo: FetchIsbnDataState;
  message: "string;";
}

export async function getBookInfoByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  try {
    const {
      data: { error, bookInfo },
    } = await axios.get<BookInfoResponse>(
      `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/info?isbn=${isbn}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
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
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error },
  } = await axios.patch<BookInfoResponse>(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/info?isbn=${isbn}`,
    { body },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    return { error, bookInfo: null };
  }
  return { error };
}

export async function deleteBookInfoByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  const {
    data: { error, message },
  } = await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/info?isbn=${isbn}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
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
  } = await axios.get<{ hasBook: boolean }>(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/check?isbn=${isbn}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return hasBook;
}
