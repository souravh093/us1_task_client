"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import { ISkill } from "@/types/skill.interface";
import AvailabilitySchedule from "./AvailabilitySchedule";
import RequestSession from "./RequestSession";

export default function SkillDetail({ skill }: { skill: ISkill }) {
  return (
    <div className="container mx-auto py-8 min-h-screen pt-20">
      <div className="py-8 bg-secondary mb-8 px-5">
        <h1 className="text-3xl font-bold">
          {skill.name} - {skill.category}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={skill.image || "/placeholder.svg"}
                  alt={skill.name}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <div>
                  <CardTitle className="text-2xl">{skill.name}</CardTitle>
                  <p className="text-muted-foreground">{skill.category}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {skill.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{skill.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created: {new Date(skill.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    Updated: {new Date(skill.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <RequestSession teacherId={skill.user.id} skillId={skill.id} availability={skill.availability} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={skill.user.profilePhoto}
                  alt={skill.user.name}
                />
                <AvatarFallback>{skill.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{skill.user.name}</h3>
                <p className="text-muted-foreground">{skill.user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground mt-4">
              <User className="h-4 w-4" />
              <span>
                Member since {new Date(skill.user.createdAt).getFullYear()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Availability Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <AvailabilitySchedule availability={skill.availability} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
