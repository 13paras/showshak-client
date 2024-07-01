import { JwtPayload } from "jwt-decode";

interface User {
  message: string;
  id: string;
  token: string;
  email?: string;
}

interface CustomPayload extends JwtPayload {
  userId: string;
}

interface MessageResponse {
  id: string,
  message: string
  token: string
  error?: {
    message: string
  }
}

export { User, CustomPayload, MessageResponse };
