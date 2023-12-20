import "server-only";
import { hash } from "bcrypt";

// Hash student password before saving to database
export const createPasswordHash = async (password: string): Promise<string> => {
  return hash(password, 10);
};
