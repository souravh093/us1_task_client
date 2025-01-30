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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { skillTableHeader } from "@/constant/tableHeader/tableHeader";
import { useGetSkillsQuery } from "@/redux/api/modules/skillApi";
import Image from "next/image";
import { ISkill } from "@/types/skill.interface";
import TableBodySkeleton from "@/components/shared/skeleton/TableSkeleton";

const Skills = () => {
  const { data: skills, isLoading } = useGetSkillsQuery(undefined);
  console.log(skills);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Skills</h1>
          <p className="text-gray-500">
            Here are the skills you have added to your profile.
          </p>
        </div>

        <Link href="/dashboard/skills/add">
          <Button className="flex items-center gpa-1">
            <Plus /> Add Skill
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-bg-gray-100">
            {skillTableHeader.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills?.data?.length < 1 ? (
            <span>No record found</span>
          ) : isLoading ? (
            <TableBodySkeleton />
          ) : (
            skills?.data?.map((skill: ISkill) => (
              <TableRow key={skill.id}>
                <TableCell>
                  <span className="flex items-center">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      width={50}
                      height={50}
                      className="rounded-2xl w-10 h-10 object-cover"
                    />

                    <span className="ml-2">{skill.name}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-green-200 px-2  py-2 rounded-lg">
                    {skill.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-blue-200 px-2  py-2 rounded-lg">
                    {skill.level}
                  </span>
                </TableCell>
                <TableCell className="flex items-center gap-5">
                  <Link href={`/dashboard/skills/${skill.id}`}>
                    <Button>Edit</Button>
                  </Link>

                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Skills;
