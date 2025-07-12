
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../utils/tokenService';
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  try {
    const decoded = TokenService.verifyToken(token) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
