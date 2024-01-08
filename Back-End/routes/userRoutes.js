import {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  signUp,
} from "../controllers/userController.js";
import express from "express";
import uploadImage from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/", uploadImage.single("image"), signUp);
userRouter.post("/byId", getOneUser);
userRouter.get("/", getUsers);
userRouter.patch("/", uploadImage.single("image"), updateUser);
userRouter.delete("/", deleteUser);

export default userRouter;
