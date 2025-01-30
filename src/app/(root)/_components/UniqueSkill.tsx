"use client";

import React from "react";
import { useGetSkillsQuery } from "@/redux/api/modules/skillApi";
import { ISkill } from "@/types/skill.interface";
import SkillCardSkeleton from "@/components/shared/skeleton/skillSkeleton";
import SkillCard from "@/components/shared/card/SkillCard";

const UniqueSkill = () => {
  const { data: skills, isLoading } = useGetSkillsQuery(undefined);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Explore Unique Skills to Enhance Your Life
      </h1>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills?.data?.length < 1 ? (
              <span>No Skills Fround</span>
            ) : isLoading ? (
              [0, 1, 2, 3].map((item, index) => (
                <SkillCardSkeleton key={index} />
              ))
            ) : (
              skills?.data
                ?.slice(0, 4)
                .map((skill: ISkill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniqueSkill;
