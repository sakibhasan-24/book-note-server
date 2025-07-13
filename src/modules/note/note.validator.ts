import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';


export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().optional(),
  isPinned: z.boolean().optional(),
  type: z.enum(['note', 'blog', 'doc']).optional()
});


export const validateCreateNote = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("validate", req.body);
    createNoteSchema.parse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};


export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  isPinned: z.boolean().optional(),
  type: z.enum(['note', 'blog', 'doc']).optional()
});


export const validateNoteUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateNoteSchema.parse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
