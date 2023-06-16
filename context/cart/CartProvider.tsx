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

  return (
    <CartContext.Provider value={{ ...state, cart: [] }}>
      {children}
    </CartContext.Provider>
  );
};
