"use client";

import { RatingStars } from "@/components/shared/Stars";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Review = {
  id: string;
  comment: string;
  rating: number;
  courses: { title: string };
};
export default function ReviewsTable({ data }: { data: Review[] }) {
  const router = useRouter();

  const [activeEdit, setactiveEdit] = useState<Review | null>(null);
  const [isUPdating, setIsUPdating] = useState<boolean>(false);

  async function remove(id: string) {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete review");
      throw error;
    } else {
      toast.success("Remove successfully");
      router.refresh();
    }
  }

  async function update(review: Review) {
    setIsUPdating(true);
    const { error } = await supabase
      .from("reviews")
      .update({ comment: review.comment, rating: review.rating })
      .eq("id", review.id);

    if (error) {
      toast.error("Failed to update review");
      throw error;
    } else {
      toast.success("Update review successfully");
      router.refresh();
      setactiveEdit(null);
    }
    setIsUPdating(false);
  }
  return (
    <div className="relative">
      <table className="w-full overflow-x-scroll mt-4">
        <thead className="bg-blue-500 text-white">
          <tr className="[&>th]:capitalize [&>th]:text-start [&>th]:p-2 [&>th]:whitespace-nowrap">
            <th>course</th>
            <th>comment</th>
            <th>rating</th>
            <th>edit</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody className="[&>tr>td]:p-2 [&>tr]:even:bg-blue-100 [&>tr>td]:whitespace-nowrap">
          {data.map((review) => (
            <tr key={review.id}>
              <td className="font-medium">{review.courses.title}</td>
              <td className="font-medium">{review.comment}</td>
              <td>
                <RatingStars rating={review.rating} />
              </td>
              <td>
                <Button classes="" clickedFun={() => setactiveEdit(review)}>
                  <FaEdit size={20} />
                </Button>
              </td>
              <td>
                <Button classes="" clickedFun={() => remove(review.id)}>
                  <MdDelete size={20} color="red" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeEdit && (
        <div
          onClick={() => setactiveEdit(null)}
          className="fixed top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center "
        >
          <form
            className="bg-white p-4 rounded-sm block w-4/5 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              if (
                activeEdit.comment.trim() !== "" &&
                activeEdit.rating.toString() != ""
              ) {
                update(activeEdit);
              }
            }}
          >
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block mb-2.5 text-sm font-bold text-gray-900 capitalize"
              >
                comment
              </label>

              <textarea
                id="comment"
                placeholder="comment..."
                className="border text-gray-700 text-sm block w-full p-3 shadow rounded-sm placeholder:capitalize"
                value={activeEdit.comment}
                onChange={(e) => {
                  setactiveEdit((state) => {
                    return state && { ...state, comment: e.target.value };
                  });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="rating"
                className="block mb-2.5 text-sm font-bold text-gray-900 capitalize"
              >
                rating
              </label>

              <input
                id="rating"
                type="number"
                placeholder="rating"
                max={5}
                min={0}
                className="border text-gray-700 text-sm block w-full p-3 shadow rounded-sm placeholder:capitalize"
                value={activeEdit.rating}
                onChange={(e) => {
                  setactiveEdit((state) => {
                    return (
                      state && { ...state, rating: Number(e.target.value) }
                    );
                  });
                }}
              />
            </div>

            <Button padding="w-full p-2" type="submit" disabled={isUPdating}>
              {isUPdating ? <Spinner /> : "update"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
