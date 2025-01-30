"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useForm } from "react-hook-form";
const CreateSkill = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      level: "",
      description: "",
      image: null as FileList | null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Create Skill</h1>
        <p className="text-gray-500">Add a new skill to your profile</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter skill name." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSkill;
