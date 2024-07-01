import { NewUser } from "@/types/reducer.types";
import { MessageResponse } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.EXPO_PUBLIC_BACKEND_API_SERVER}/user/`;

// console.log(baseUrl)

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } =
  userApi;
