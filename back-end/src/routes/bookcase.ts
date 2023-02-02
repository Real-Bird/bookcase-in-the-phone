import { Router } from "express";
import * as bookcaseCtrl from "../controller/bookcase";

const router = Router();

router.get("/list", bookcaseCtrl.bookList);

router.post("/info", bookcaseCtrl.savedBookInfo);

router.get("/info", bookcaseCtrl.getBookInfoByIsbn);

export default router;
