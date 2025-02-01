"use client";

import React from "react";
import SessionsTable from "./SessionTable";
import { useGetSessionsQuery } from "@/redux/api/modules/sessionApi";

const RequestedSessions = ({ id }: { id: string | undefined }) => {
  const query = [
    {
      key: "filter",
      value: JSON.stringify({
        skillId: id,
      }),
    },
  ];
  const { data: sessions, isLoading } = useGetSessionsQuery(query);

  console.log(sessions)
  return (
    <div>
      <SessionsTable loading={isLoading} sessions={sessions?.data} />
    </div>
  );
};

export default RequestedSessions;

