import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthorized, setLoading } from "../slice/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (res) => res.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsAuthorized(true));
          dispatch(setUser(data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/profile/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/profile/password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateAvatar: builder.mutation({
      query: (body) => ({
        url: "/profile/avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `admin/user/`,
      }),
      providesTags : ['adminUser']
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}`,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ id , body }) => ({
        url: `/admin/user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    deleteUser : builder.mutation({
      query : (id) => ({
        url: `/admin/user/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : ["adminUser"]
    })
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation
} = userApi;
