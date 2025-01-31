import React from "react";
import SkillDetail from "./_components/SkillDetail";
import envConfig from "@/config/envConfig";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


const SkillDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  const skill = await fetch(`${envConfig.baseApi}/skills/${id}`).then(
    (res) => res.json()
  );

  return <SkillDetail skill={skill?.data} />;
};

export default SkillDetails;
