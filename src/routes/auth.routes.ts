import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validateDto";

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post(
  "/register",
  validateDto(CreateUserDTO),
  asyncHandler((request, response) => authController.register(request, response))
);

authRoutes.post(
  "/login",
  validateDto(LoginDTO),
  asyncHandler((request, response) => authController.login(request, response))
);
