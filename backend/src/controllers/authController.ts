import type { Request, Response } from "express";
import client from "../prismaClient.js";
import { users, account } from "../config/appWrite.js";

export const signUp = async(req: Request, res: Response)=>{
    const { email, password, name, batch, role } = req.body;
    try {
        const existingUser = await client.user.findFirst({ 
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const user = await account.create("unique()", email, password, name);
        await client.user.create({
            data: {
                appwriteId: user.$id,
                name,
                email,
                batch,
                role,
            }
        });
        res.status(201).json({
            message: "user created successfully",
            user
        });
    } 
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const signIn = async(req: Request, res: Response)=>{
    const { email, password } = req.body;
    try {
        const session = await account.createEmailPasswordSession(email, password);
        res.json({
            token: session.secret
        });
    } 
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}