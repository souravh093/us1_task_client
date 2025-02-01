import envConfig from "@/config/envConfig";
import React from "react";
import UpdateSkillForm from "../../_components/UpdateSkillForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const UpdateSkills = async ({ params }: PageProps) => {
  const { id } = await params;
  const skill = await fetch(`${envConfig.baseApi}/skills/${id}`).then((res) =>
    res.json()
  );

  console.log(skill)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Update Skill</h1>
        <p className="text-gray-500">This page is for updating the skill</p>
      </div>

      <UpdateSkillForm skill={skill?.data} />
    </div>
  );
};

export default UpdateSkills;
