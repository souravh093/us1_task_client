import { showToast } from "@/components/shared/Toast/CustomTost";
import envConfig from "@/config/envConfig";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseApi,
  prepareHeaders: async (headers) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (
    result.error &&
    result.error.data &&
    typeof result.error.data === "object" &&
    "message" in result.error.data
  ) {
    showToast("error", result.error.data.message as string);
  }
  if (result.error && result.error.status === 401) {
    // Try to refresh the token
    const refreshResult = await fetch(`${envConfig.baseApi}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResult.ok) {
      const data = await refreshResult.json();
      Cookies.set("accessToken", data.accessToken);

      // Retry the original request with new access token
      return baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token failed. Logging out...");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Skill", "Session", "User"],
  endpoints: () => ({}),
});
