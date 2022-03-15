import express from "express";
import { edit, logout, remove, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/:id(\\d+)/delete", remove);

export default userRouter;
