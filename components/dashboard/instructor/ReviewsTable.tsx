"use client";

import { RatingStars } from "@/components/shared/Stars";

export type Review = {
  id: string;
  comment: string;
  rating: number;
  courses: { title: string };
  profiles: { full_name: string };
};
export default function ReviewsTable({ data }: { data: Review[] }) {
  return (
    <table className="w-full overflow-x-scroll mt-4">
      <thead className="bg-blue-500 text-white">
        <tr className="[&>th]:capitalize [&>th]:text-start [&>th]:p-2 [&>th]:whitespace-nowrap [&>th]:border-r">
          <th>course</th>
          <th>student</th>
          <th>rating</th>
          <th>comment</th>
        </tr>
      </thead>
      <tbody className="[&>tr>td]:p-2 [&>tr]:even:bg-blue-100 [&>tr>td]:whitespace-nowrap [&>tr>td]:font-medium">
        {data.map((review) => (
          <tr key={review.id}>
            <td>{review.courses.title}</td>
            <td className="capitalize">{review.profiles.full_name}</td>
            <td>
              <RatingStars rating={review.rating} />
            </td>
            <td>{review.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
