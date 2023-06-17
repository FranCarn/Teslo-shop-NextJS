import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "../../interfaces";
import Cookie from "js-cookie";

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

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[CART] - LoadCart from Cookies",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({ type: "[CART] - LoadCart from Cookies", payload: [] });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[CART] - Change product quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[CART] - Remove product in cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
