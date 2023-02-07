import { Router } from "express";
import * as authCtrl from "../controller/auth";
const router = Router();
router.get("/login/success", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/google", authCtrl.reqGoogle);
router.get("/google/callback", authCtrl.callbackGoogle);
router.get("/check", authCtrl.check);
export default router;
