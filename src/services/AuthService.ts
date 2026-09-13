import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserResponseDTO } from "../dtos/UserResponseDTO";
import { UserRole } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
import { hashPassword } from "../utils/passwordHash";
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
}
