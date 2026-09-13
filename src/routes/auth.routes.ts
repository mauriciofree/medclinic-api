import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateDto } from "../middlewares/validateDto";

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post(
  "/register",
  validateDto(CreateUserDTO),
  asyncHandler((request, response) => authController.register(request, response))
);
