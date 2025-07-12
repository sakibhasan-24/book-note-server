
import { NextFunction, Request, Response } from 'express';
import { email, z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema=z.object({
  email:z.string(),
  password:z.string()
})

export const validateRegister = (req:Request, res:Response, next:NextFunction) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error:any) {
     next(error)

  }
};

export const validateLogin=(req:Request,res:Response,next:NextFunction)=>{
  try {
    console.log(req.body)
    loginSchema.parse(req.body)
    next();
  } catch (error:any) {
    next(error)
  }
}
