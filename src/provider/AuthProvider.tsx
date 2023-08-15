import { createContext, FunctionComponent, ReactNode, useState } from "react";
import { Token } from "./authUtils";

type AuthContextProps = {
  token: Token;
  saveToken: undefined | ((userToken?: Token) => void);
};

const AuthContext = createContext<AuthContextProps>({
  token: undefined,
  saveToken: undefined,
});

const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined | null>(
    sessionStorage.getItem("token")
  );

  const saveToken = (userToken?: Token): void => {
    if (userToken) {
      sessionStorage.setItem("token", userToken);
      setToken(userToken);
    } else {
      sessionStorage.removeItem("token");
      setToken(undefined);
    }
  };

  return (
    <AuthContext.Provider value={{ token: token, saveToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
