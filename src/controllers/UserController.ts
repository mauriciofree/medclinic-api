import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async me(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const user = await this.userService.findById(request.user.sub);

    return response.status(200).json(user);
  }
}
