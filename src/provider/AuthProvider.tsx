import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Token, AuthUser } from "./authUtils";
import { User, UserAuthResponse } from "../pages/auth/types";

type AuthContextProps = {
  token: Token;
  user: AuthUser;
  saveToken: undefined | ((authResponse?: UserAuthResponse) => void);
};

const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  user: undefined,
  saveToken: undefined,
});

const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined | null>(
    sessionStorage.getItem("token")
  );
  const [user, setUser] = useState<User | undefined | null>(undefined);

  const saveToken = (authResponse?: UserAuthResponse): void => {
    if (authResponse?.token) {
      sessionStorage.setItem("token", authResponse.token);
      setToken(authResponse.token);
      setUser(authResponse.user);
    } else {
      sessionStorage.removeItem("token");
      setToken(undefined);
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token: token, saveToken: saveToken, user: user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
