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
import Image from "next/image";
import { useGetSkillsQuery } from "@/redux/api/modules/skillApi";
import { QueryItem } from "@/types/shared.interface";
import { skillTableHeader2 } from "@/constant/tableHeader/tableHeader";
import { ISkill } from "@/types/skill.interface";

const SkillsTreads = () => {
  const query: QueryItem[] = [
    {
      key: "orderBy",
      value: JSON.stringify({
        requestCount: "desc",
      }),
    },
  ];
  const { data: skills, isLoading, isFetching } = useGetSkillsQuery(query);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Skills Treads
          </h1>
          <p className="text-gray-500">
            List of all skills with request count
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-bg-gray-100">
            {skillTableHeader2.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills?.data?.length > 0 ? (
            skills?.data?.map((skill: ISkill) => (
              <TableRow key={skill.id}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      width={100}
                      height={100}
                      className="rounded-md w-10 h-10 object-center"
                    />
                    <h1>{skill.name}</h1>
                  </span>
                </TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell>{skill.requestCount}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <Image
                      src={skill.user.profilePhoto}
                      alt={skill.user.name}
                      width={50}
                      height={50}
                      className="rounded-md w-10 h-10 object-center"
                    />
                    <h1>{skill.user.name}</h1>
                  </span>
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

export default SkillsTreads;
