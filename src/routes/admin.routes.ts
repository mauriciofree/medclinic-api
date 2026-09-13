import { Router } from "express";
import { UserRole } from "../entities/User";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

export const adminRoutes = Router();

adminRoutes.get(
  "/ping",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  (request, response) => {
    return response.status(200).json({
      message: "Acesso administrativo autorizado."
    });
  }
);
