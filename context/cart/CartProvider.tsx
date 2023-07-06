import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct, IOrder, ShippingAddress } from "../../interfaces";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import axios from "axios";

export interface CartInitialState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  totalPrice: number;
  shippingAddress?: ShippingAddress;
}

interface Props {
  children: JSX.Element;
}

const INITIAL_STATE: CartInitialState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  totalPrice: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
        : [];

      dispatch({
        type: "[CART] - LoadCart from Cookies",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({ type: "[CART] - LoadCart from Cookies", payload: [] });
    }
  }, []);
  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address?.address2 || "");
    Cookies.set("zip", address.zip);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);
    dispatch({
      type: "[CART] - Update Address",
      payload: address,
    });
  };

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

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("No shipping address.");
    }
    const body: IOrder = {
      orderItems: state.cart.map((product) => ({
        ...product,
        size: product.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      totalPrice: state.totalPrice,
      isPaid: false,
    };
    try {
      const { data } = await tesloApi.post("/orders", body);

      dispatch({ type: "[CART] - Order complete" });

      return {
        hasError: false,
        message: data._id!,
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
        message: "Error without handle",
      };
    }
  };

  useEffect(() => {
    if (Cookies.get("firstName")) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zip: Cookies.get("zip") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };
      dispatch({
        type: "[CART] - Load Address from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      totalPrice: subTotal * (taxRate + 1),
    };
    dispatch({ type: "[CART] - Update Order Summary", payload: orderSumary });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
