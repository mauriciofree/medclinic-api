import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get(
  "/me",
  authMiddleware,
  asyncHandler((request, response) => userController.me(request, response))
);
