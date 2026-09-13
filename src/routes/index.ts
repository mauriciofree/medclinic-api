import { Router } from "express";
import { authRoutes } from "./auth.routes";

export const routes = Router();

routes.get("/", (request, response) => {
  return response.json({
    message: "MedClinic API",
    status: "online"
  });
});

routes.use("/auth", authRoutes);
