import { Router } from "express";
import { getUserById, getAllUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUserById)

export default userRouter