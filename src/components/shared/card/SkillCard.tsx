import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ISkill } from "@/types/skill.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <Card key={skill.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={skill.image || "/placeholder.svg"}
        alt={skill.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-bold">Category:</span> {skill.category}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-bold">Level:</span> {skill.level}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={skill.user.profilePhoto} alt={skill.user.name} />
              <AvatarFallback>{skill.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{skill.user.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/all-skills/${skill.id}`} passHref>
          <Button className="w-full">Arrange Session</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;