import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { LoginResponseDTO } from "../dtos/LoginResponseDTO";
import { UserResponseDTO } from "../dtos/UserResponseDTO";
import { UserRole } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/passwordHash";
import { UserService } from "./UserService";

export class AuthService {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  async register(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? UserRole.ATTENDANT
    });

    return this.userService.toResponseDTO(user);
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const passwordMatches = await comparePassword(data.password, user.password);

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const token = generateToken({
      sub: user.id,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
