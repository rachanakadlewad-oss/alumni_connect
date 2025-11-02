import type { Request, Response } from "express";
import client from "../prismaClient.js";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await client.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                batch: true,
                linkedin: true,
                bio: true,
                createdAt: true,
            },
        });

        res.status(200).json(users);
    }
    catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const user = await client.user.findUnique({
            where: {
                id: String(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                batch: true,
                linkedin: true,
                bio: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};