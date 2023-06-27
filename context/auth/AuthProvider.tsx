import { FC, useEffect, useReducer } from "react";
import { AuthContext, authReducer } from ".";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[AUTH] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "User can't be created, try again",
      };
    }
  };

  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/revalidate");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[AUTH] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    router.reload();
    dispatch({ type: "[AUTH] - Logout" });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        checkToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
