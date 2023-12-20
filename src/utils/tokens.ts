import { sign } from "jsonwebtoken";
import "server-only";

// Create access token for student
export const createAccessToken = ({
  id,
  username,
  name,
  surname,
}: {
  id: number;
  username: string;
  name: string;
  surname: string;
}): string => {
  return sign(
    { id, username, name, surname },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "60 days",
    }
  );
};
