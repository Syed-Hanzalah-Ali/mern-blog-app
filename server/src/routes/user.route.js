import { Router } from "express";
import { deleteUser, getUsers, test, update } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.use(verifyJWT)

router.route("/test").get(test)

router.route("/update/:userId").patch(upload.single('profilePicture'),update)

router.route("/delete/:userId").delete(deleteUser)

router.route("/getusers").get(getUsers)
export default router;