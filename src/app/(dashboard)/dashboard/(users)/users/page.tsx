"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userTableHeader } from "@/constant/tableHeader/tableHeader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/api/modules/userApi";
import { IUser } from "@/types/user.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { showToast } from "@/components/shared/Toast/CustomTost";

const UsersList = () => {
  const { data: users, isLoading, isFetching } = useGetUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    const res = await deleteUser(id).unwrap();

    if (res.success) {
      showToast("success", res.message);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Users List</h1>
          <p className="text-gray-500">Here all the users are listed.</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-bg-gray-100">
            {userTableHeader.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.length > 0 ? (
            users?.data?.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Image
                    src={user.profilePhoto}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <TableCell className="flex items-center gap-5">
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {isLoading || isFetching ? "Loading..." : "No data found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
