
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../../error/AppError';

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
      throw new AppError('Invalid request data', 422);

  }
};
