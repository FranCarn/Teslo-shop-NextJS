import { ICartProduct } from "../../interfaces";
import { CartInitialState } from "./CartProvider";

type UiActionType =
  | {
      type: "[CART] - LoadCart from Cookies";
      payload: ICartProduct[];
    }
  | { type: "[CART] - Add Product"; payload: ICartProduct[] }
  | { type: "[CART] - Change product quantity"; payload: ICartProduct };

export const cartReducer = (
  state: CartInitialState,
  action: UiActionType
): CartInitialState => {
  switch (action.type) {
    case "[CART] - LoadCart from Cookies":
      return {
        ...state,
        cart: action.payload,
      };
    case "[CART] - Add Product":
      return {
        ...state,
        cart: action.payload,
      };
    case "[CART] - Change product quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };
    default:
      return state;
  }
};
