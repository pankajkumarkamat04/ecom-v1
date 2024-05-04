import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import userSlice from "./slice/userSlice";
import { userApi } from "./api/userApi";
import cartSlice from "./slice/cartSlice";
import { orderApi } from "./api/orderApi";

const store = configureStore({
  reducer: {
    auth: userSlice,
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

export default store;
