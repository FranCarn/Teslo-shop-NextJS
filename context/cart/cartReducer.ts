import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartInitialState } from "./CartProvider";

type UiActionType =
  | {
      type: "[CART] - LoadCart from Cookies";
      payload: ICartProduct[];
    }
  | { type: "[CART] - Add Product"; payload: ICartProduct[] }
  | { type: "[CART] - Change product quantity"; payload: ICartProduct }
  | { type: "[CART] - Remove product in cart"; payload: ICartProduct }
  | {
      type: "[CART] - Update Order Summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        totalPrice: number;
      };
    }
  | { type: "[CART] - Load Address from Cookies"; payload: ShippingAddress }
  | { type: "[CART] - Update Address"; payload: ShippingAddress }
  | { type: "[CART] - Order complete" };

export const cartReducer = (
  state: CartInitialState,
  action: UiActionType
): CartInitialState => {
  switch (action.type) {
    case "[CART] - LoadCart from Cookies":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
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
    case "[CART] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    case "[CART] - Update Order Summary":
      return {
        ...state,
        ...action.payload,
      };
    case "[CART] - Load Address from Cookies":
    case "[CART] - Update Address":
      return {
        ...state,
        shippingAdress: action.payload,
      };
    case "[CART] - Order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
};
