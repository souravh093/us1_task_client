"use client";

import { showToast } from "@/components/shared/Toast/CustomTost";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequestSessionMutation } from "@/redux/api/modules/sessionApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import { IAvailability } from "@/types/availability.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const RequestSession = ({
  availability,
  skillId,
  teacherId,
}: {
  availability: IAvailability[];
  skillId: string;
  teacherId: string;
}) => {
  // zod validation schema for the form
  const schema = z.object({
    availability: z.string({
      required_error: "Please select a day of the week",
    }),
  });

  const currentUserData = useAppSelector(selectCurrentUser);
  const [requestSession, { isLoading }] = useRequestSessionMutation();
  console.log(currentUserData);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      availability: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (currentUserData?.id === teacherId) {
      showToast("error", "You cannot request a session with yourself");
      return;
    }
    if (!currentUserData) {
      showToast("error", "You need to login to request a session");
      return;
    }
    const payload = {
      skillId,
      availabilityId: data.availability,
      requestorId: currentUserData.id,
      status: "PENDING",
    };

    const response = await requestSession(payload).unwrap();

    if (response.success) {
      showToast(
        "success",
        `Session requested successfully and check your Dashboard for updates`
      );
      form.reset();
    } else {
      showToast("error", response.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center space-x-4"
        >
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Day of the Week</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availability.map((availability, index) => (
                      <SelectItem value={availability.id} key={index}>
                        {availability.dayOfWeek}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the day of the week you would like to request a session
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Requesting..." : "Request Session"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RequestSession;
