import { QueryItem } from "@/types/shared.interface";
import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => ({
        url: "/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
    getReviews: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.key, item.value as string);
          });
        }
        return {
          url: "/reviews",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
