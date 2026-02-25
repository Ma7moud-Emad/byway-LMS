"use client";

import { supabase } from "@/lib/supabase/client";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { useRouter } from "next/navigation";

export default function CommentForm({
  user_id,
  course_id,
  enrollment_id,
}: {
  user_id: string;
  course_id: string;
  enrollment_id: string;
}) {
  const router = useRouter();
  const [isComment, setIsComment] = useState(false);
  const [reply, setReply] = useState({ comment: "", rating: 0 });

  async function insertComment(review: { comment: string; rating: number }) {
    setIsComment(true);
    const { error } = await supabase.from("reviews").insert([
      {
        comment: review.comment,
        rating: review.rating,
        user_id,
        course_id,
        enrollment_id,
      },
    ]);

    if (error) {
      toast.error("Failed to add review");
      throw error;
    } else {
      toast.success("Add review successfully");
      router.refresh();
    }
    setIsComment(false);
  }

  return (
    <div className="bg-white p-4 rounded-sm">
      <h3 className="font-bold text-gray-900 text-2xl">Leave a Reply</h3>
      <form
        className="block mt-4 w-4/5 md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          insertComment(reply);
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
            value={reply.comment}
            onChange={(e) =>
              setReply((state) => ({ ...state, comment: e.target.value }))
            }
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
            value={reply.rating}
            onChange={(e) =>
              setReply((state) => ({
                ...state,
                rating: Number(e.target.value),
              }))
            }
          />
        </div>

        <Button padding="w-full p-2" type="submit" disabled={isComment}>
          {isComment ? <Spinner /> : " post comment"}
        </Button>
      </form>
    </div>
  );
}
