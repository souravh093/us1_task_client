"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerValidationSchema } from "@/validations/auth.validation";
import { useCreateUserMutation } from "@/redux/api/modules/userApi";
import { uploadImageToFirebase } from "@/utils/firebaseUtils";
import { showToast } from "@/components/shared/Toast/CustomTost";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [registerUser, { isLoading }] = useCreateUserMutation();

  const form = useForm({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      profilePhoto: null as FileList | null,
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const downloadUrl = await uploadImageToFirebase(
      data.profilePhoto?.[0],
      setIsImageUploading
    );

    if (downloadUrl) {
      const res = await registerUser({
        ...data,
        profilePhoto: downloadUrl,
      }).unwrap();

      if (res.success) {
        showToast("success", res.message);
        form.reset();
        setPreviewImage(null);
        router.push("/login");
      } else {
        showToast("error", res.message);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    form.setValue("profilePhoto", e.target.files);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center flex-col items-center space-y-4">
                <Image
                  width={100}
                  height={100}
                  src={logo || "/placeholder.svg"}
                  alt="logo"
                  className="w-20"
                />
                <h1 className="text-2xl font-semibold text-gray-700">
                  Create an account
                </h1>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
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
              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {previewImage && (
                          <div className="mt-2 flex justify-center">
                            <Image
                              src={previewImage || "/placeholder.svg"}
                              alt="Profile preview"
                              width={100}
                              height={100}
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                      </div>
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
                {isLoading || isImageUploading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <div>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
