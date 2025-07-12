import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

export const validateCreateCategory=(req:Request,res:Response,next:NextFunction)=>{
    try {
        createCategorySchema.parse(req.body)
        next()
    } catch (error:any) {
        next(error);
    }
    
}
export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional()
});
