import { User } from "../pages/auth/types";

type Token = string | null | undefined;
type AuthUser = User | null | undefined;

const isLoggedIn = (token: Token): boolean => {
  return !!token;
};

export { isLoggedIn };
export { type Token, type AuthUser };
