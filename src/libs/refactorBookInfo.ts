import { setSubject } from "@libs/utils";

export const refactorBookInfo = (bookInfo: Bookcase.BookInfo) => {
  const book = { ...bookInfo };
  const authorReg = / ?(지은이|지음|저자) ?[:]? ?/g;
  const translatorReg = /[ ]?(옮김)[: ]*|(옮긴이)[: ]+/g;
  const replaceWriter = bookInfo.author.replace(authorReg, "");
  const [author, rest] = replaceWriter.split(";");
  const translator =
    rest && rest.includes("옮") ? rest.replace(translatorReg, "") : "-";
  book.publisher_predate = (bookInfo.publisher_predate ?? "").replace(
    /(\d{4})(\d{2})(\d{2})/g,
    "$1-$2-$3"
  );
  book.author = author;
  book.translator = translator;
  book.title = bookInfo.title.replace(/\(([\s\S]*)\) ?/g, "");
  book.subject = setSubject(bookInfo.subject);
  book.publisher = bookInfo.publisher;
  book.title_url = bookInfo.title_url;
  book.ea_isbn = bookInfo.ea_isbn;
  return book;
};
