import type { Request, Response } from "express";
import client from "../prismaClient.js";

type AuthenticatedRequest = Request & { user?: { id: string } | null };

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
    organisation: true,
  },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
}
}
export const getLoggedUserById = async (req: AuthenticatedRequest, res: Response) => {
  const loggedUserId = req.user?.id;

  if (!loggedUserId) {
    return res.status(400).json({ error: "Authenticated user ID is required" });
  }

  try {
    const user = await client.user.findUnique({
      where: {
        id: String(loggedUserId),
      },
      include: {
        organisation: true, 
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

export  const editUserDetails = async (req: AuthenticatedRequest, res: Response) =>{
  const loggedUserId = req.user?.id;

  if (!loggedUserId) {
    return res.status(400).json({ error: "Authenticated user ID is required" });
  }

  try {
    const {
      name,
      bio,
      email,
      github,
      linkedin,
      website,
      batch,
      role,
      picture,
      organisationId,
    } = req.body;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (email) updateData.email = email;
    if (github) updateData.github = github;
    if (linkedin) updateData.linkedin = linkedin;
    if (website) updateData.website = website;
    if (batch) updateData.batch = batch;
    if (role) updateData.role = role;
    if (picture) updateData.picture = picture;

    if (organisationId) {
      updateData.organisation = {
        connect: { id: organisationId }
      };
    }
    const updatedUser = await client.user.update({
      where: { id: String(loggedUserId) },
      data: updateData,
      include: {
        organisation: true
      }
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
