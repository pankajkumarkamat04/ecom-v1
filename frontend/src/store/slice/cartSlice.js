import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItems(state, actions) {
      let product = actions.payload;
      console.log(product);
      let itemInCart = state.cartItems.find(
        (item) => item.product == product.product
      );
      if (itemInCart) {
        const res = state.cartItems.filter(
          (item) => itemInCart.product !== item.product
        );
        state.cartItems = [...res, product];
      } else {
        state.cartItems = [...state.cartItems, product];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, actions) {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    deleteCartItem(state, actions) {
      let product = actions.payload;
      const res = state.cartItems.filter((item) => product !== item.product);

      state.cartItems = res;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity(state, actions) {
      const res = state.cartItems.map((item) => {
        if (item.product == actions.payload) {
          let quantity = item.quantity + 1;
          return { ...item, quantity };
        }
        return item;
      });
      state.cartItems = res;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity(state, actions) {
      const res = state.cartItems.map((item) => {
        if (item.product == actions.payload) {
          let quantity = item.quantity - 1;
          return { ...item, quantity };
        }
        return item;
      });
      state.cartItems = res;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setShippingInfo(state, actions) {
      state.shippingInfo = actions.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export default cartSlice.reducer;

export const {
  setCartItems,
  deleteCartItem,
  increaseQuantity,
  decreaseQuantity,
  setShippingInfo,
  clearCart,
} = cartSlice.actions;
