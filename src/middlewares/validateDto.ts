import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

type DtoClass<T extends object> = {
  new (): T;
};

export function validateDto<T extends object>(dtoClass: DtoClass<T>) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, request.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => ({
        field: error.property,
        messages: Object.values(error.constraints ?? {})
      }));

      throw new AppError("Erro de validação.", 400, validationErrors);
    }

    request.body = dto;

    return next();
  };
}
