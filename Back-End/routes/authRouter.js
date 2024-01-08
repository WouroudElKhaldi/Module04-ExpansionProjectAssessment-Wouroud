import {
  signUp,
  logIn,
  loggedInUser,
  logOut,
} from "../controllers/userController.js";
import express from "express";
import uploadImage from "../middleware/multer.js";
import { authenticate, checkRole } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/singup", uploadImage.single("image"), signUp);
authRouter.post("/login", logIn);
authRouter.post("/logout", logOut);
authRouter.get("/logged-in-user", authenticate, loggedInUser);

export default authRouter;
