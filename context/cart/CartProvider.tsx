import { FC, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "../../interfaces";

export interface CartInitialState {
  cart: ICartProduct[];
}

interface Props {
  children: JSX.Element;
}

const INITIAL_STATE: CartInitialState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((item) => item._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[CART] - Add Product",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (item) => item._id === product._id && item.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[CART] - Add Product",
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((item) => {
      if (item._id !== product._id) return item;
      if (item.size !== product.size) return item;

      item.quantity += product.quantity;

      return item;
    });
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[CART] - Add Product",
        payload: updatedProducts,
      });
  };
  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
