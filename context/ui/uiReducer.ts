import { InitialState } from "./UiProvider";

type UiActionType = { type: "[UI] - Toggle Menu" };

export const uiReducer = (
  state: InitialState,
  action: UiActionType
): InitialState => {
  switch (action.type) {
    case "[UI] - Toggle Menu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};
