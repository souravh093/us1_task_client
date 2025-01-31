import React from "react";
import envConfig from "@/config/envConfig";
import SessionsTable from "../_components/SessionTable";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const RequestedSessions = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryParams = new URLSearchParams();

  queryParams.append("filter", JSON.stringify({ skillId: id }));

  const skillSessions = await fetch(
    `${envConfig.baseApi}/sessions?${queryParams}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const sessions = await skillSessions.json();

  return (
    <div>
      <SessionsTable sessions={sessions?.data} />
    </div>
  );
};

export default RequestedSessions;
