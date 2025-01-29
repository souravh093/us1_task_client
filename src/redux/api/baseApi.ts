import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
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
  if (result.error && result.error.status === 401) {
    // Try to refresh the token
    const refreshResult = await fetch("http://localhost:5000/api/v1/refresh", {
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
  endpoints: () => ({}),
});
