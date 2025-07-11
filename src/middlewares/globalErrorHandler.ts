import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError } from '../error/AppError';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong';
  let errors: any = null;

  // 1. Zod Validation Error
  if (err instanceof ZodError) {
    statusCode = 422;
    message = 'Validation failed';
    console.log(err);
    
    errors = err.issues &&  err.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
    })) ;
  }

  // 2. Mongoose Duplicate Key Error
  else if (
    err instanceof mongoose.Error &&
    (err as any).code === 11000
  ) {
    statusCode = 409;
    const field = Object.keys((err as any).keyPattern)[0];
    message = `${field} must be unique`;
  }

  // 3. Mongoose CastError 
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // 4. Mongoose ValidationError 
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Mongoose validation failed';
    errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // 5. Custom AppError
  else if (err instanceof AppError) {
    statusCode = Number(err.statusCode) || 500;
    message = err.message;
  }

  // 6. Unknown Error
  else {
    message = err.message || message;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
