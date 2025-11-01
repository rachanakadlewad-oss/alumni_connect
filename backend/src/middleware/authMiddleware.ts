import { account } from "../config/appWrite.js";
import { type Request, type Response, type NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) return res.status(401).json({ error: "Unauthorized" });

    try {
        const user = await account.get();
        (req as any).user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
