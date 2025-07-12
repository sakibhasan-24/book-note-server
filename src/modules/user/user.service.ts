
import bcrypt from "bcryptjs";
import { IUserRepository } from './user.IRepository';
import { IUser } from './user.model';
import { AppError } from "../../error/AppError";
import { TokenService } from "../../utils/tokenService";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async registerUser(userData: { name: string; email: string; password: string }): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email Already Exists!",400);
    }

    // Hash password (business logic)
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.userRepository.createUser({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    return user;
  }
  

  // login
  async loginUser(credentials:{email:string,password:string}){
    console.log(credentials,"credentia")
    const existingUser=await this.userRepository.findByEmail(credentials.email);

    console.log(existingUser)
    if(!existingUser){
      throw new AppError("Credentials Not Found!",401);
    }
    const isMatch = await bcrypt.compare(credentials.password, existingUser.password);
   if (!isMatch) throw new AppError("Invalid credentials", 401);
    //create token
    const token=TokenService.createToken({userId:existingUser?._id,email:existingUser?.email});
     return {
    token,
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    },
  };
  }
}
