import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RootProfileDropdown from "../root/RootProfileDropDown";
import { currentUser } from "@/services/AuthService";

const Navbar = async () => {
  const userData = await currentUser();
  return (
    <div className="bg-transparent py-4 absolute w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex gap-2 items-center">
            <Image
              className="w-10 h-10"
              width={400}
              height={400}
              src={logo}
              alt="logo"
            />
            <h1 className="text-2xl font-bold">SkillShare</h1>
          </div>
          <div className="flex gap-5 font-semibold">
            <Link className="hover:text-gray-800" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-gray-800" href={"/skills"}>
              Skills
            </Link>
            <Link className="hover:text-gray-800" href={"/contact"}>
              Contact
            </Link>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Button className="rounded-3xl">Try It Free Today</Button>
          <RootProfileDropdown data={userData} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
