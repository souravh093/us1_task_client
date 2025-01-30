import { QueryItem } from "@/types/shared.interface";
import { baseApi } from "../baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (payload) => ({
        url: "/skills",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Skill"],
    }),

    getSkills: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: QueryItem) => {
            params.append(item.key, item.value as string);
          });
        }
        return {
          url: "/skills",
          method: "GET",
        };
      },
      providesTags: ["Skill"],
    }),

    getSkill: builder.query({
      query: (id) => `/skills/${id}`,
      providesTags: ["Skill"],
    }),

    updateSkill: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useGetSkillsQuery,
  useGetSkillQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
