declare namespace Bookcase {
  type BookInfo = {
    title: string;
    author: string;
    translator?: string;
    publisher: string;
    publisher_predate?: string;
    ea_isbn: string;
    title_url: string;
    subject: string;
    review?: string;
    start_date?: string;
    end_date?: string;
  };

  type BookcaseItemInfo = Pick<
    BookInfo,
    | "title"
    | "author"
    | "translator"
    | "publisher"
    | "subject"
    | "title_url"
    | "ea_isbn"
  >;
}
