import React from "react";
import bannerImage from "@/assets/banner.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-secondary min-h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-6xl font-bold leading-tight">
            Unlock Your Potential with Peer-to-Peer Skills Sharing!
          </h1>
          <p className="max-w-xl">
            Learn from experienced teachers and elevate your skills in a
            collaborative environment.
          </p>
          <Link href="/all-skills">
            <Button className="rounded-3xl">Try It Free Today</Button>
          </Link>
        </div>
        <div>
          <Image src={bannerImage} alt="banner" width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
