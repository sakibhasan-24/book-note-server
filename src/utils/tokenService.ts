import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export class TokenService {
  static createToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET as string,
         { expiresIn: process.env.JWT_EXPIRATION_TIME as any});
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
