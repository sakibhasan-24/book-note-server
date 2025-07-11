
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateRegister = (req:Request, res:Response, next:NextFunction) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error:any) {
    return res.status(400).json({ error: error?.errors });
  }
};
