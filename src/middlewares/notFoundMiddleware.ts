import { Request, Response } from "express";

export function notFoundMiddleware(request: Request, response: Response) {
  return response.status(404).json({
    message: "Rota não encontrada."
  });
}
