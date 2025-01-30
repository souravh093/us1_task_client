/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageToFirebase } from "@/utils/firebaseUtils";
import { useCreateSkillMutation } from "@/redux/api/modules/skillApi";
import { showToast } from "@/components/shared/Toast/CustomTost";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import { Delete, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSkillValidationSchema } from "@/validations/skill.validation";

const CreateSkill = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const userData = useAppSelector(selectCurrentUser);

  const [createSkill, { isLoading }] = useCreateSkillMutation();

  const form = useForm({
    // resolver: zodResolver(createSkillValidationSchema),
    defaultValues: {
      name: "",
      category: "",
      level: "",
      description: "",
      image: null as FileList | null,
      availability: [
        { dayOfWeek: "", status: "AVAILABLE", startTime: "", endTime: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const downloadUrl = await uploadImageToFirebase(
      data.image?.[0],
      setIsImageUploading
    );
    const skillInfo = {
      ...data,
      image: downloadUrl,
      userId: userData?.id ? userData.id : null,

    };

    console.log(skillInfo);
    const res = await createSkill(skillInfo).unwrap();

    if (res.success) {
      form.reset();
      setPreviewImage(null);
      showToast("success", res.message);
    } else {
      showToast("error", res.message);
    }
  };

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create Skill</h1>
        <p className="text-gray-500">Add a new skill to your profile</p>
      </div>

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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AVAILABLE">Available</SelectItem>
                            <SelectItem value="UNAVAILABLE">
                              Unavailable
                            </SelectItem>
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
                  className="inline-block my-5 bg-red-500 hover:bg-red-600"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-20" />
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
                <FormLabel>Bio</FormLabel>
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
                <FormLabel>Profile Photo</FormLabel>
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
                          src={previewImage || "/placeholder.svg"}
                          alt="Profile preview"
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
            {isLoading || isImageUploading ? "Creating..." : "Create Skill"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSkill;
