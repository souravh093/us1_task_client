import React from "react";
import bannerImage from "@/assets/banner.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-secondary min-h-[calc(100vh-200px)] flex items-center px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Unlock Your Potential with Peer-to-Peer Skills Sharing!
          </h1>
          <p className="max-w-xl mx-auto lg:mx-0">
            Learn from experienced teachers and elevate your skills in a
            collaborative environment.
          </p>
          <Link href="/all-skills">
            <Button className="rounded-3xl mx-auto lg:mx-0">Try It Free Today</Button>
          </Link>
        </div>
        <div className="justify-center hidden lg:block lg:justify-end">
          <Image src={bannerImage} alt="banner" width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
