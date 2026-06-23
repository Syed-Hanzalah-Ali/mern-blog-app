import { Router } from "express";
import { deleteUser, deleteUsersByAdmin, getUser, getUsers, test, update } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.use(verifyJWT)

router.route("/test").get(test)

router.route("/update/:userId").patch(upload.single('profilePicture'),update)

router.route("/delete/:userId").delete(deleteUser)   // user delete himself

router.route("/getusers").get(getUsers)

router.route("/deleteusers/:userId").delete(deleteUsersByAdmin)

router.route("/:userId").get(getUser)
export default router;