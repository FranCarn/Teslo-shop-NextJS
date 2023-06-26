import { FC, useReducer } from "react";
import { AuthContext, authReducer } from ".";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";
import Cookies from "js-cookie";

export interface AuthInitialState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface Props {
  children: JSX.Element;
}

const INITIAL_STATE: AuthInitialState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[AUTH] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
