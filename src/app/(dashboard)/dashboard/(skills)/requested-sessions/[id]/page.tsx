import React from "react";
import SessionsTable from "../_components/SessionTable/page";

const RequestedSessions = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const queryParams = new URLSearchParams();

  queryParams.append("filter", JSON.stringify({ skillId: id }));

  const skillSessions = await fetch(
    `http://localhost:5000/api/v1/sessions?${queryParams}`,
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
