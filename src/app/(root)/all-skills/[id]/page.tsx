import React from "react";
import SkillDetail from "./_components/SkillDetail";

const SkillDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const skill = await fetch(`http://localhost:5000/api/v1/skills/${id}`).then(
    (res) => res.json()
  );

  return <SkillDetail skill={skill?.data} />;
};

export default SkillDetails;
