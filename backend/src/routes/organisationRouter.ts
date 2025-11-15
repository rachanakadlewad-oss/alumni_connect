import { Router } from "express";
import { getAllOrganisation, getUserByOrganisation } from "../controllers/organisationController.js";
import  authMiddleware  from '../middleware/authMiddleware.js';

export const organisationRouter=Router()
organisationRouter.get("/:organisationId",authMiddleware,getUserByOrganisation)
organisationRouter.get("/",authMiddleware,getAllOrganisation);