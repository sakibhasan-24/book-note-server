import { Request, Response } from 'express';
import { UserRepository } from '../user/user.Repository';
import { UserService } from '../user/user.service';


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await userService.registerUser(req.body);
      const userResponse = { id: user._id, name: user.name, email: user.email };
      res.status(201).json({ user: userResponse,status:true,message:"User Registered Successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
