import { Request, Response } from "express";
import Book from "../db/book";

export const bookList = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    return res.status(403).json({ error: true, message: "Not Authorized" });
  }
  const bookList = await Book.find(
    { userId: token },
    {
      _id: 1,
      title: 1,
      title_url: 1,
      author: 1,
      translator: 1,
      publisher: 1,
      subject: 1,
    }
  );
  res
    .status(200)
    .json({ error: false, bookList, message: "Successful Response" });
};

export const savedBookInfo = async (req: Request, res: Response) => {
  const { token } = req.query;
  const {
    publisher,
    author,
    translator,
    title_url,
    ea_isbn,
    subject,
    title,
    publisher_predate,
    start_date,
    end_date,
    review,
  } = req.body;
  if (!token) {
    return res.status(403).json({ error: true, message: "Not Authorized" });
  }
  await Book.create({
    userId: token,
    publisher,
    author,
    translator,
    title_url,
    ea_isbn,
    subject,
    title,
    publisher_predate,
    start_date,
    end_date,
    review,
  }).catch((e) => {
    return res.status(400).json({ error: true, message: `Error : ${e}` });
  });
  res.status(201).json({ error: false, message: "Successful Upload" });
};
