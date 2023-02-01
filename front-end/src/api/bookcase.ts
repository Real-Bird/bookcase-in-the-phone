import { getUserToken } from "@api/auth";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_REACT_APP_API_URL;

export interface SavedBookInfoArgs {
  title: string;
  author: string;
  translator: string;
  publisher: string;
  publisher_predate: string;
  ea_isbn: string;
  title_url: string;
  review: string;
  start_date: string;
  end_date: string;
  subject: string;
}

export async function savedBookInfo(bookInfo: SavedBookInfoArgs) {
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
  SavedBookInfoArgs,
  "title" | "author" | "translator" | "publisher" | "subject" | "title_url"
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
