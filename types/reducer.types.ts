import { User } from "./types";

interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface NewUser {
  form: FormData
}

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  dob?: string;
}

interface RegisterMutation {
  email: string;
  password: string;
}

export { UserReducerInitialState, NewUser, SignupForm, RegisterMutation };
