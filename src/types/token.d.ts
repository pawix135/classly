import { JwtPayload as J } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload extends J.JwtPayload {
    id: number;
    username: string;
    name: string;
    surname: string;
  }
}