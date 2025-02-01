import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/types/review.interface";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewCard = ({ data }: { data: IReview }) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={data.reviewer.profilePhoto || "/placeholder.svg"}
            alt={data.reviewer.name}
            width={50}
            height={50}
            className="rounded-full mr-4 w-12 h-12 object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {data.reviewer.name}
            </h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < data.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{data.comment}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={data.session.skill.user.profilePhoto || "/placeholder.svg"}
              alt={data.session.skill.user.name}
              width={40}
              height={40}
              className="rounded-full mr-2 w-10 h-10 object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">
                {data.session.skill.user.name}
              </p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {data.session.skill.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
