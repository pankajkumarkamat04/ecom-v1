import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (bulider) => ({
    login: bulider.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: bulider.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: bulider.query({
      query: () => ({
        url: "/auth/logout",
      }),
    }),
    forgotPassword: bulider.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "PUT",
        body,
      }),
    }),
    resetPassword: bulider.mutation({
      query: ({password : body, token}) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }),
    }),
    resetPasswordVerify: bulider.query({
      query: (token) => ({
        url: `/password/verify/${token}`,
        method :"GET"
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResetPasswordVerifyQuery,
} = authApi;
