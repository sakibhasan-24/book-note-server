
import bcrypt from "bcryptjs";
import { IUserRepository } from './user.IRepository';
import { IUser } from './user.model';
import { AppError } from "../../error/AppError";

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
}
