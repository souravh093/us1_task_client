/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { uploadImageToFirebase } from "@/utils/firebaseUtils";
import { useUpdateSkillMutation } from "@/redux/api/modules/skillApi";
import { showToast } from "@/components/shared/Toast/CustomTost";
import { ISkill } from "@/types/skill.interface";

interface UpdateSkillFormProps {
  skill: ISkill;
}

const UpdateSkillForm = ({ skill }: UpdateSkillFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(skill.image || null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [updateSkill, { isLoading }] = useUpdateSkillMutation();

  const form = useForm({
    defaultValues: {
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "",
      description: skill.description || "",
      image: null as FileList | null,
      availability:
        skill.availability && skill.availability.length > 0
          ? skill.availability
          : [{ dayOfWeek: "", status: "AVAILABLE", startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    form.setValue("image", e.target.files);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let downloadUrl = previewImage;
    if (data.image && data.image.length > 0) {
      downloadUrl = (await uploadImageToFirebase(data.image[0], setIsImageUploading)) || null;
    }

    const updatedSkillData = {
      id: skill.id,
      payload: {
        ...data,
        image: downloadUrl,
      }
    };

    try {
      const res = await updateSkill(updatedSkillData).unwrap();
      if (res.success) {
        showToast("success", res.message);
      } else {
        showToast("error", res.message);
      }
    } catch (error: any) {
      showToast("error", error?.data?.message || "An error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Skill Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PROGRAMMING">Programming</SelectItem>
                    <SelectItem value="DESIGN">Design</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="MUSIC">Music</SelectItem>
                    <SelectItem value="PHOTOGRAPHY">Photography</SelectItem>
                    <SelectItem value="VIDEOGRAPHY">Videography</SelectItem>
                    <SelectItem value="WRITING">Writing</SelectItem>
                    <SelectItem value="COOKING">Cooking</SelectItem>
                    <SelectItem value="LANGUAGE">Language</SelectItem>
                    <SelectItem value="FITNESS">Fitness</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Skill Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Availabilities */}
        <div>
          <h2 className="text-xl font-semibold">Availabilities</h2>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name={`availability.${index}.dayOfWeek`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day of Week</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUNDAY">Sunday</SelectItem>
                          <SelectItem value="MONDAY">Monday</SelectItem>
                          <SelectItem value="TUESDAY">Tuesday</SelectItem>
                          <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                          <SelectItem value="THURSDAY">Thursday</SelectItem>
                          <SelectItem value="FRIDAY">Friday</SelectItem>
                          <SelectItem value="SATURDAY">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`availability.${index}.status`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AVAILABLE">Available</SelectItem>
                          <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`availability.${index}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`availability.${index}.endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="inline-block my-5 bg-red-500 hover:bg-red-600"
              >
                Remove Availability
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              append({
                dayOfWeek: "",
                status: "AVAILABLE",
                startTime: "",
                endTime: "",
              })
            }
          >
            Add Availability
          </Button>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter skill description."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Image</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {previewImage && (
                    <div className="mt-2 flex">
                      <Image
                        src={previewImage}
                        alt="Skill preview"
                        width={200}
                        height={200}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading || isImageUploading ? "Updating..." : "Update Skill"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateSkillForm;
