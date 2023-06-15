import { FC, useReducer } from "react";
import { uiReducer, UiContext } from "./";

export interface InitialState {
  isMenuOpen: boolean;
}
interface Props {
  children: JSX.Element;
}
const INITIAL_STATE: InitialState = {
  isMenuOpen: false,
};

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);
  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - Toggle Menu" });
  };
  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
