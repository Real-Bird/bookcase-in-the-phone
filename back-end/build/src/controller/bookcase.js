"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookByIsbn = exports.checkBookByIsbn = exports.updateBookInfoByIsbn = exports.getBookInfoByIsbn = exports.savedBookInfo = exports.bookList = void 0;
const book_1 = require("../db/book");
const bookList = async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(403).json({ error: true, message: "Not Authorized" });
    }
    const bookList = await book_1.default.find({ userId: token }, {
        _id: 1,
        title: 1,
        title_url: 1,
        author: 1,
        translator: 1,
        publisher: 1,
        subject: 1,
        ea_isbn: 1,
    }).sort({ updatedAt: "desc" });
    res
        .status(200)
        .json({ error: false, bookList, message: "Successful Response" });
};
exports.bookList = bookList;
const savedBookInfo = async (req, res) => {
    const { token } = req.query;
    const { publisher, author, translator, title_url, ea_isbn, subject, title, publisher_predate, start_date, end_date, review, } = req.body;
    if (!token) {
        return res.status(403).json({ error: true, message: "Not Authorized" });
    }
    await book_1.default.create({
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
    return res.status(201).json({ error: false, message: "Successful Upload" });
};
exports.savedBookInfo = savedBookInfo;
const getBookInfoByIsbn = async (req, res) => {
    const { token, isbn } = req.query;
    if (!token || !isbn) {
        return res.status(401).json({ error: true, message: `Not Authorization` });
    }
    const bookInfo = await book_1.default.findOne({
        userId: token,
        ea_isbn: isbn,
    });
    if (!bookInfo) {
        return res
            .status(404)
            .json({ error: true, message: "Not found this ISBN" });
    }
    return res
        .status(201)
        .json({ error: false, bookInfo, message: "Successful Sends" });
};
exports.getBookInfoByIsbn = getBookInfoByIsbn;
const updateBookInfoByIsbn = async (req, res) => {
    const { token, isbn } = req.query;
    if (!token || !isbn) {
        return res.status(401).json({ error: true, message: `Not Authorization` });
    }
    const { body: { review, start_date, end_date }, } = req.body;
    const bookInfo = await book_1.default.findOne({
        userId: token,
        ea_isbn: isbn,
    });
    if (!bookInfo) {
        return res
            .status(404)
            .json({ error: true, message: "Not found this ISBN" });
    }
    await bookInfo.updateOne({
        $set: {
            review,
            start_date,
            end_date,
            updatedAt: Date.now(),
        },
    }, { new: true });
    return res.status(201).json({ error: false, message: "Successful Updates" });
};
exports.updateBookInfoByIsbn = updateBookInfoByIsbn;
const checkBookByIsbn = async (req, res) => {
    const { token, isbn } = req.query;
    if (!token || !isbn) {
        return res.status(401).json({ error: true, message: `Not Authorization` });
    }
    const bookInfo = await book_1.default.findOne({
        userId: token,
        ea_isbn: isbn,
    });
    if (!bookInfo) {
        return res
            .status(200)
            .json({ hasBook: false, message: "No has this book" });
    }
    return res
        .status(200)
        .json({ hasBook: true, bookInfo, message: "Has this book" });
};
exports.checkBookByIsbn = checkBookByIsbn;
const deleteBookByIsbn = async (req, res) => {
    const { token, isbn } = req.query;
    const bookInfo = await book_1.default.findOneAndDelete({
        userId: token,
        ea_isbn: isbn,
    });
    if (!bookInfo) {
        return res.status(400).json({ error: true, message: "Bad Request" });
    }
    return res.status(204).json({ error: false, message: "Successful Delete" });
};
exports.deleteBookByIsbn = deleteBookByIsbn;
