import type { Request, Response } from "express";
import client from "../prismaClient.js";
import { users } from "../config/appWrite.js";

export const getAllAlumni = async (req: Request, res: Response) => {
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
        github:true,
        website:true,
        bio: true,
        organisation: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });
    const finalUsers = users
  .filter((user:any) => user.role === "ALUMNI") 
  .map((user:any) => ({
    ...user,
    role: "ALUMNI",
  }));

    res.status(200).json({
      users:finalUsers,
      success:true
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message , success:false});
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
        id: String(id),
      },
      include: {
    organisation: true, // populate the related organisation
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
