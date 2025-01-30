/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/AuthService";

import { ChevronDown, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ data }: { data: any }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex cursor-pointer items-center space-x-2">
            {data?.profilePhoto ? (
              <Image
                src={data?.profilePhoto}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full bg-gray-200"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            )}

            <h3>
              {data?.email}
            </h3>

            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex items-center space-x-2">
              {data?.profilePhoto ? (
                <Image
                  src={data?.profilePhoto}
                  alt="profile"
                  width={40}
                  height={40}
                  className="h-14 w-14 rounded-sm bg-gray-200"
                />
              ) : (
                <User size={40} className="h-14 w-14 rounded-sm bg-gray-200" />
              )}
              <div>
                <h3>
                  {data?.email}
                </h3>
                <p className="text-xs text-gray-500">
                  {data?.role}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/profile`}>Profile Update</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/change-password`}>Change Password</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
