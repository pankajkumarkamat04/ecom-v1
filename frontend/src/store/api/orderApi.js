import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order" , "adminOrder"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ orderDetail: body }) => ({
        url: "/order/new",
        method: "POST",
        body,
      }),
    }),
    getOrder: builder.query({
      query: () => ({
        url: "/order/myorder",
        method: "GET",
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags : ["Order"]
    }),
    stripeCheckoutSession: builder.mutation({
      query: ({ orderDetail: body }) => ({
        url: "/payment/stripe/session",
        method: "POST",
        body,
      }),
    }),
    getDashboardSales: builder.query({
      query: ({ startdate, enddate }) => ({
        url: "/admin/order/getsalesdata",
        params: {
          startdate,
          enddate,
        },
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/order/",
      }),
      providesTags : ["adminOrder"]
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/order/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminOrder" , "Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags : ["adminOrder"]
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrderDetailsQuery,
  useStripeCheckoutSessionMutation,
  useLazyGetDashboardSalesQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
