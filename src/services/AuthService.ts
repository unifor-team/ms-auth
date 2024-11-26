import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface IUserInput {
  email: string;
  password: string;
}

export class AuthService {

  async login({ email, password }: IUserInput): Promise<string> {

    const user = await User.findOneBy({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }


    return this.generateToken(user.id.toString());
  }


  private generateToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });
  }
}
