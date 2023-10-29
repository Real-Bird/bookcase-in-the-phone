import { AxiosError } from "axios";
import axiosInstance from "@api/httpClient";
import { TOKEN_KEY } from "constants/auth";

export interface SavedBookResponse {
  error: boolean;
  message: string;
}

export async function savedBookInfo(bookInfo: Bookcase.BookInfo) {
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
  bookList: Bookcase.BookcaseItemInfo[];
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
  bookInfo: Bookcase.BookInfo;
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
  bookInfo: Bookcase.BookInfo;
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

export interface CheckedExistedBookResponse {
  error?: boolean;
  hasBook?: boolean;
  bookInfo?: Bookcase.BookInfo | null;
  message?: string;
}

export async function hasBookByIsbn(isbn: string) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  if (Number.isNaN(+isbn))
    return {
      error: true,
      message: "바코드 숫자를 입력해주세요.",
      bookInfo: null,
    };
  if (isbn.length < 10)
    return {
      error: true,
      message: "바코드 길이가 너무 짧습니다: 10자 이상",
      bookInfo: null,
    };
  try {
    const { data } = await axiosInstance.get<CheckedExistedBookResponse>(
      `/bookcase/check?isbn=${isbn}`
    );
    return { ...data, error: false };
  } catch (e) {
    const { response } = e as AxiosError<CheckedExistedBookResponse>;
    return { ...response?.data, error: true };
  }
}
