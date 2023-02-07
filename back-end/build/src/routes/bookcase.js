"use strict";

const router = require("express").Router();
const bookcaseCtrl = require("../controller/bookcase");

router.get("/list", bookcaseCtrl.bookList);
router.post("/info", bookcaseCtrl.savedBookInfo);
router.get("/info", bookcaseCtrl.getBookInfoByIsbn);
router.patch("/info", bookcaseCtrl.updateBookInfoByIsbn);
router.delete("/info", bookcaseCtrl.deleteBookByIsbn);
router.get("/check", bookcaseCtrl.checkBookByIsbn);

exports.router = router;
