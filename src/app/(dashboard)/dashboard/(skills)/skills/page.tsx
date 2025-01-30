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

const Skills = () => {
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
          <Button className="flex items-center gpa-1"><Plus /> Add Skill</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-bg-gray-100">
            <TableHead className="w-[100px] ">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Skills;
