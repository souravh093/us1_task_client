import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Unlock = () => {
  return (
    <div className="container mx-auto bg-primary my-20 py-20 px-32 leading-tight rounded-xl flex flex-col gap-5 items-center text-center">
      <h1 className="text-5xl text-white font-bold">
        Unlock Your Potential with Peer-to-Peer Skills Sharing!
      </h1>
      <p className="text-gray-100">
        Join a vibrant community of learners and teachers who are passionate
        about sharing knowledge and expertise.
      </p>
      <Link href="/all-skills">
        <Button className="bg-white text-black rounded-lg font-bold hover:bg-gray-100">
          Explore Available Skills
        </Button>
      </Link>
    </div>
  );
};

export default Unlock;
