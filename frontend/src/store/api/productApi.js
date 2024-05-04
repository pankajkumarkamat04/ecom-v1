import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (bulider) => ({
    getProduct: bulider.query({
      query: (params) => ({
        url: "/product",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "rating[gte]": params.rating,
          "price[gte]": params.min,
          "price[lte]": params.max,
        },
      }),
    }),
    getProductDetail: bulider.query({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    createReview: bulider.mutation({
      query: (body) => ({
        url: `/review/create`,
        method: "POST",
        body,
      }),
    }),
    getReview: bulider.query({
      query: (id) => ({
        url: `/review/${id}`,
      }),
      providesTags : ["review"]
    }),
    canReview: bulider.query({
      query: (id) => ({
        url: `/review/canreview/${id}`,
      }),
    }),
    getAllProduct: bulider.query({
      query: () => ({
        url: "/admin/products",
      }),
      providesTags: ["adminProduct"],
    }),
    createProduct: bulider.mutation({
      query: ({ body }) => ({
        url: "/admin/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminProduct"],
    }),

    updateProduct: bulider.mutation({
      query: ({ id, body }) => ({
        url: `/admin/product/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminProduct"],
    }),
    uploadProductImages: bulider.mutation({
      query: ({ id, body }) => ({
        url: `/admin/product/${id}/upload_image`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProductImage: bulider.mutation({
      query: ({ id, body }) => ({
        url: `/admin/product/${id}/delete_image`,
        body,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: bulider.mutation({
      query: (id) => ({
        url: `/admin/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["adminProduct"],
    }),
    deleteReview: bulider.mutation({
      query: (id) => ({
        url: `/admin/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductDetailQuery,
  useCreateReviewMutation,
  useGetReviewQuery,
  useCanReviewQuery,
  useCreateProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useDeleteReviewMutation
} = productApi;
