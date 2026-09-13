import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { TokenPayload, verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado.", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Token mal formatado.", 401);
  }

  try {
    const payload = verifyToken(token);
    request.user = payload;

    return next();
  } catch {
    throw new AppError("Token inválido ou expirado.", 401);
  }
}
