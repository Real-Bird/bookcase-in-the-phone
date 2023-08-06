import { getUserToken } from "@api/auth";
import { FetchBookcaseState } from "@libs/bookcaseContextApi";
import { FetchIsbnDataState } from "@libs/searchContextApi";
import axios from "axios";

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
  const token = getUserToken("BiPToken");
  if (!token) {
    throw new Error("not token");
  }
  const { data } = await axios.post(
    `${SERVER_URL}/bookcase/info?token=${token}`,
    bookInfo,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

export interface BookListResponse {
  error: boolean;
  bookList: FetchBookcaseState;
  message: "string;";
}

export async function getBookList() {
  const token = getUserToken("BiPToken");
  const {
    data: { error, bookList },
  } = await axios.get<BookListResponse>(
    `${import.meta.env.VITE_REACT_APP_API_URL}/bookcase/list?token=${token}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
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
  const token = getUserToken("BiPToken");
  try {
    const {
      data: { error, bookInfo },
    } = await axios.get<BookInfoResponse>(
      `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/bookcase/info?token=${token}&isbn=${isbn}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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
  const token = getUserToken("BiPToken");
  const {
    data: { error },
  } = await axios.patch<BookInfoResponse>(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/bookcase/info?token=${token}&isbn=${isbn}`,
    { body },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
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
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
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
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return hasBook;
}
