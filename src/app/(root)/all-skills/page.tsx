"use client";

import { useGetSkillsQuery } from "@/redux/api/modules/skillApi";
import type { QueryItem } from "@/types/shared.interface";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISkill } from "@/types/skill.interface";
import { useSearchParams } from "next/navigation";
import SkillCard from "@/components/shared/card/SkillCard";
import SkillCardSkeleton from "@/components/shared/skeleton/skillSkeleton";
import { CATEGORIES, LEVELS } from "@/constant/skill/skillConstant";

const AllSkills = () => {
  const searchParams = useSearchParams();
  const category2 = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(category2 || "");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);

  const query: QueryItem[] = [
    { key: "searchTerm", value: searchTerm },
    {
      key: "orderBy",
      value: JSON.stringify({ createdAt: sort === "new" ? "desc" : "asc" }),
    },
    { key: "page", value: page.toString() },
    { key: "limit", value: "12" },
  ];

  if (category) {
    query.push({
      key: "filter",
      value: JSON.stringify({
        category: category.toUpperCase(),
      }),
    });
  }

  if (level) {
    query.push({
      key: "filter",
      value: JSON.stringify({
        level: level.toUpperCase(),
      }),
    });
  }

  const { data: skills, isLoading, isFetching } = useGetSkillsQuery(query);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, category, level, sort]);

  return (
    <div className="min-h-screen container mx-auto pt-20">
      <div className="py-8 bg-secondary mb-8 px-5">
        <h1 className="text-3xl font-bold">All Skills</h1>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-5">
        <Input
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {LEVELS.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Newest First</SelectItem>
            <SelectItem value="old">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            setSearchTerm("");
            setCategory("");
            setLevel("");
            setSort("");
          }}
        >
          Clear All Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading || isFetching ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkillCardSkeleton key={index} />
          ))
        ) : skills?.data?.length < 1 ? (
          <span className="font-bold text-2xl">NO SKILL Found</span>
        ) : (
          skills?.data.map((skill: ISkill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        )}
      </div>

      {skills && skills.meta.total > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= skills.meta.page}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllSkills;
