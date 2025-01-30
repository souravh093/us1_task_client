import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Mock data for skills
const skills = [
  {
    id: 1,
    name: "Mindful Meditation",
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      name: "Emma Watson",
      photo: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    name: "Urban Gardening",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1548138081-d02590416982?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      name: "Michael Chen",
      photo: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    name: "Culinary Fusion",
    category: "Cooking",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      name: "Sophia Rodriguez",
      photo: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    name: "Digital Illustration",
    category: "Art",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      name: "Alex Kim",
      photo: "/placeholder.svg?height=40&width=40",
    },
  },
];

const UniqueSkill = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Explore Unique Skills to Enhance Your Life
      </h1>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <Card key={skill.id} className="overflow-hidden">
                <Image
                  src={skill.image || "/placeholder.svg"}
                  alt={skill.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{skill.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={skill.teacher.photo}
                          alt={skill.teacher.name}
                        />
                        <AvatarFallback>
                          {skill.teacher.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {skill.teacher.name}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Arrange Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniqueSkill;
