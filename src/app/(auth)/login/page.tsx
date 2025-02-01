/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginValidationSchema } from "@/validations/auth.validation";
import { useLoginUserMutation } from "@/redux/api/modules/authApi";
import { showToast } from "@/components/shared/Toast/CustomTost";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await loginUser(data).unwrap();

    const user = verifyToken(res.token.accessToken) as TUser;

    dispatch(setUser({ user, token: res.token.accessToken }));

    if (res.success) {
      Cookies.set("accessToken", res.token.accessToken, { expires: 365 });
      showToast("success", res.message);
      form.reset();
      if (redirect) {
        const decodedRedirect = decodeURIComponent(redirect); // Decode the redirect URL
        router.push(decodedRedirect);  // Use the decoded URL
      } else {
        router.push("/");
      }
    } else {
      showToast("error", res.message);
    }
  };

  // Default credentials
  const defaultCredentials = {
    user: { email: "normaluser@gmail.com", password: "password" },
    admin: { email: "souravh093@gmail.com", password: "admin@123" },
  };

  const handleAutoFill = (role: "user" | "admin") => {
    const credentials = defaultCredentials[role];
    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center flex-col items-center space-y-4">
                <Image
                  width={100}
                  height={100}
                  src={logo}
                  alt="logo"
                  className="w-20"
                />
                <h1 className="text-2xl font-semibold text-gray-700">
                  Login to your account
                </h1>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <Button
                  type="button"
                  onClick={() => handleAutoFill("user")}
                >
                  Autofill User
                </Button>
                <Button
                  type="button"
                  onClick={() => handleAutoFill("admin")}
                  className="bg-blue-500"
                >
                  Autofill Admin
                </Button>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*******"
                        {...field}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size={"lg"}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <div>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
