"use server";

import { CustomJwtPayload } from "@/types/shared.interface";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const currentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decoded: CustomJwtPayload | null = null;

  if (accessToken) {
    decoded = jwtDecode<CustomJwtPayload>(accessToken);
  }

  return decoded;
};




export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  
};
