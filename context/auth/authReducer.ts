import { IUser } from "../../interfaces";
import { AuthInitialState } from "./AuthProvider";

type ActionType =
  | {
      type: "[AUTH] - Login";
      payload: IUser;
    }
  | {
      type: "[AUTH] - Logout";
    };

export const authReducer = (
  state: AuthInitialState,
  action: ActionType
): AuthInitialState => {
  switch (action.type) {
    case "[AUTH] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "[AUTH] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
