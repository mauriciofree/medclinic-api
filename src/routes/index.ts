import { Router } from "express";
import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

export const routes = Router();

routes.get("/", (request, response) => {
  return response.json({
    message: "MedClinic API",
    status: "online"
  });
});

routes.use("/admin", adminRoutes);
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
