import jwt from "jsonwebtoken";
import { UserRole } from "../entities/User";

export interface TokenPayload {
  sub: string;
  role: UserRole;
}

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn
  } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, jwtSecret) as TokenPayload;
}
