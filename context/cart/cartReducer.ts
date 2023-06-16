import { ICartProduct } from "../../interfaces";
import { CartInitialState } from "./CartProvider";

type UiActionType =
  | { type: "[CART] - LoadCart from Cookies | Storage"; payload: ICartProduct }
  | { type: "[CART] - Add Product"; payload: ICartProduct };

export const cartReducer = (
  state: CartInitialState,
  action: UiActionType
): CartInitialState => {
  switch (action.type) {
    case "[CART] - LoadCart from Cookies | Storage":
      return {
        ...state,
      };

    default:
      return state;
  }
};
