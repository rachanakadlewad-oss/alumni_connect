import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import client from "../prismaClient.js";
import dotenv from "dotenv";

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "ddd"

export const signUp = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    batch,
    role,
    github,
    linkedin,
    organisation,
    website,
    bio,
  } = req.body;
  try {
    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    
    await client.user.create({
      data: {
        name,
        password,
        email,
        batch,
        role,
        linkedin,
        github,
        organisation: {
          connectOrCreate: {
            where: { name: organisation },
            create: { name: organisation },
          },
        },
        website,
        bio,
      },
    });
    res.status(201).json({
      message: "user created successfully",
      success: true
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user= await client.user.findFirst({
      where:{
        email:email
      },
    })
    console.log(user);
    if(!user){
      return res.status(401).send({
          message: "user not found",
          success: false
      })
    }
    const match = password === user.password
        if(match){
            const token = jwt.sign({
                id: user.id
            },JWT_SECRET)

            res.send({
                message: "user logged in succesfully",
                token: token,
                success: true,
                role: user.role
            })
        }
        else{
            return res.status(401).send({
                message: "incorrect password",
                success: false
            })
        }
    }
   
    catch(e){
       res.status(500).send({
            message: "Error in logging user",
            success: false
        })
    }
}