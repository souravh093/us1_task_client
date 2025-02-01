"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateReviewMutation } from "@/redux/api/modules/reviewApi";
import { showToast } from "@/components/shared/Toast/CustomTost";

interface ReviewFormData {
  rating: number;
  comment: string;
}

const GiveReview = ({
  data,
}: {
  data: { sessionId: string; reviewerId: string | undefined };
}) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (formData: ReviewFormData) => {
    const payload = {
      ...formData,
      rating: Number(formData.rating),
      sessionId: data.sessionId,
      reviewerId: data.reviewerId,
    };

    const res = await createReview(payload).unwrap();

    if (res.success) {
      showToast("success", res.message);

      form.reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-1">
          <Star /> Give Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give Review for this session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Enter rating (1-5)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your comment"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GiveReview;
