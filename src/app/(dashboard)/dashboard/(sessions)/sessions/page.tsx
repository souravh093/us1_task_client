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
import { sessionTableHeader } from "@/constant/tableHeader/tableHeader";
import { useGetSessionsQuery } from "@/redux/api/modules/sessionApi";
import TableBodySkeleton from "@/components/shared/skeleton/TableSkeleton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import { ISession } from "@/types/session.interface";

const Sessions = () => {
  const currentUserData = useAppSelector(selectCurrentUser);
  const query = [
    {
      key: "filter",
      value: JSON.stringify({
        requestorId: currentUserData?.id,
      }),
    },
  ];
  const { data: sessions, isLoading } = useGetSessionsQuery(query);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Your Requested Sessions
          </h1>
          <p className="text-gray-500">
            Here are the sessions you have requested
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-bg-gray-100">
            {sessionTableHeader.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions?.data?.length < 1 ? (
            <span>No record found</span>
          ) : isLoading ? (
            <TableBodySkeleton />
          ) : (
            sessions?.data?.map((session: ISession) => (
              <TableRow key={session.id}>
                <TableCell>
                  <span className="flex items-center">
                    <Image
                      src={session.skill.image || "/placeholder.svg"}
                      alt={session.skill.name}
                      width={50}
                      height={50}
                      className="rounded-2xl w-10 h-10 object-cover"
                    />

                    <span className="ml-2">{session.skill.name}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-green-200 px-2  py-2 rounded-lg">
                    {session.skill.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-blue-200 px-2  py-2 rounded-lg">
                    {session.skill.level}
                  </span>
                </TableCell>
                <TableCell>{session.availability.dayOfWeek}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-5">
                    {session.availability.startTime} -{" "}
                    {session.availability.endTime}
                  </span>
                </TableCell>
                <TableCell>
                  {session.status === "PENDING" ? (
                    <span className="bg-yellow-200 px-2 py-2 rounded-lg">
                      {session.status}
                    </span>
                  ) : session.status === "ACCEPTED" ? (
                    <span className="bg-green-200 px-2 py-2 rounded-lg">
                      {session.status}
                    </span>
                  ) : session.status === "REJECTED" ? (
                    <span className="bg-red-200 px-2 py-2 rounded-lg">
                      {session.status}
                    </span>
                  ) : (
                    <span className="bg-blue-200 px-2 py-2 rounded-lg">
                      {session.status}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="flex items-center space-x-2">
                    <Image
                      src={session.skill.user.profilePhoto}
                      alt={session.skill.user.name}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <span>{session.skill.user.name}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span>
                    {session.meetingLink ? (
                      <Link href={session.meetingLink} target="_blank">
                        <Button className="w-full">Join Meeting</Button>
                      </Link>
                    ) : (
                      <Button className="w-full" disabled>
                        No Meeting Link
                      </Button>
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Sessions;
