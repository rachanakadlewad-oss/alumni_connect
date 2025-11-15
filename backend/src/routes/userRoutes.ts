import { Router } from "express";
import { getUserById, getAllAlumni, getLoggedUserById, editUserDetails } from "../controllers/userController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/alumni",authMiddleware, getAllAlumni)
userRouter.get("/:id",authMiddleware, getUserById)
userRouter.get("/",authMiddleware,getLoggedUserById)
userRouter.put("/edit",authMiddleware,editUserDetails)
export default userRouter