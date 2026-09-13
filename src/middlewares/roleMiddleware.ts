import { NextFunction, Request, Response } from "express";
import { UserRole } from "../entities/User";
import { AppError } from "../errors/AppError";

export function roleMiddleware(...allowedRoles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    if (!allowedRoles.includes(request.user.role)) {
      throw new AppError("Usuário sem permissão para acessar este recurso.", 403);
    }

    return next();
  };
}
