import { Router } from "express";
import { getUserById, getAllAlumni } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/alumni", getAllAlumni)
userRouter.get("/:id", getUserById)
export default userRouter