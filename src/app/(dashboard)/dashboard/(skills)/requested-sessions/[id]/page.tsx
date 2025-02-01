import React from "react";
import RequestedSessions from "../_components/RequestedSessions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <RequestedSessions id={id} />
    </div>
  );
};

export default page;
