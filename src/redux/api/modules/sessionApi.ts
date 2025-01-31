import { QueryItem } from "@/types/shared.interface";
import { baseApi } from "../baseApi";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestSession: builder.mutation({
      query: (payload) => ({
        url: "/sessions",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Session"],
    }),

    getSessions: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.key, item.value as string);
          });
        }
        return {
          url: "/sessions",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Session"],
    }),

    getSession: builder.query({
      query: (id) => `/sessions/${id}`,
      providesTags: ["Session"],
    }),

    updateSession: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/sessions/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Session"],
    }),

    deleteSession: builder.mutation({
      query: (id) => ({
        url: `/sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const { 
  useRequestSessionMutation, 
  useGetSessionsQuery, 
  useGetSessionQuery, 
  useUpdateSessionMutation, 
  useDeleteSessionMutation
 } = sessionApi;
