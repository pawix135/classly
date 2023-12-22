import { JwtPayload, sign } from "jsonwebtoken";
import "server-only";

// Create access token for student
export const createAccessToken = (
  token_values: Partial<JwtPayload>
): string => {
  return sign(token_values, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "60 days",
  });
};
