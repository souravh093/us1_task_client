import React from "react";
import authImage from "@/assets/auth.jpg";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen items-center justify-center relative">
      <Link className="absolute top-5 left-5 bg-gray-100 hover:bg-secondary p-3 rounded-full" href="/">
        <Home className="cursor-pointer" size={32} />
      </Link>
      <Image className="md:block hidden" src={authImage} alt="Auth image" />
      <div className="bg-secondary h-screen">{children}</div>
    </div>
  );
};

export default AuthLayout;
