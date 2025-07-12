import { Request, Response } from 'express';
import { UserRepository } from '../user/user.Repository';
import { UserService } from '../user/user.service';
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class AuthController {
  static async register(req: Request, res: Response) {
   
      const user = await userService.registerUser(req.body);
      const userResponse = { id: user._id, name: user.name, email: user.email };
      res.status(201).json({ user: userResponse,status:true,message:"User Registered Successfully" });
  }
  static async login(req:Request,res:Response){
    const{token,user}=await userService.loginUser(req.body);
    console.log(user,token);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7, 
      });

       res.status(200).json({ user: user,status:true,message:"User Login Successfully",token });
  }
}
