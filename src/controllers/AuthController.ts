import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: Request, response: Response): Promise<Response> {
    const user = await this.authService.register(request.body);

    return response.status(201).json(user);
  }
}
