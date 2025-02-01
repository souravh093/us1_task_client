"use client";
import type React from "react";
import { useGetReviewsQuery } from "@/redux/api/modules/reviewApi";
import ReviewCard from "@/components/shared/card/ReviewCard";
import { IReview } from "@/types/review.interface";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ReviewSection = () => {
  const { data: reviews } = useGetReviewsQuery(undefined);
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          What Our Users Say
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8">
          Discover the impact of peer-to-peer learning
        </p>
        <div className="max-w-3xl mx-auto">
          <Carousel className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <CarouselContent>
              {reviews?.data?.map((review: IReview) => (
                <ReviewCard key={review.id} data={review} />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
