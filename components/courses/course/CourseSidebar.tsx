"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import Button from "@/components/ui/Button";

import { CourseProps } from "@/lib/types";
import Spinner from "@/components/ui/Spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function CourseSidebar({
  price,
  discountPrice,
  role,
  course_id,
  student_id,
}: CourseProps) {
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [actions, setActions] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  const router = useRouter();

  async function enrollNow() {
    if (student_id) {
      setIsEnrolled(true);
      const { error } = await supabase
        .from("enrollments")
        .insert([
          {
            student_id,
            course_id,
            enrolled_at: new Date(),
            last_accessed_at: new Date(),
          },
        ])
        .select();
      setIsEnrolled(false);

      if (error) {
        toast.error("Failed to enroll in course");
      } else {
        toast.success("Enrolled in course successfully");
        router.refresh();
      }
    } else {
      toast.error("Please log in to enroll in this course");
      router.push("/signin");
    }
  }

  async function addToCart() {
    if (student_id) {
      const { error } = await supabase
        .from("cart_items")
        .insert([{ user_id: student_id, course_id, added_at: new Date() }])
        .select();
      setActions((val) => !val);

      if (error) {
        toast.error("Failed to add course to your cart");
      } else {
        toast.success("Course added to your cart successfully");
        router.refresh();
      }
    } else {
      toast.error("Please log in to add this course to your cart");
      router.push("/signin");
    }
  }

  async function addToWishlist() {
    if (student_id) {
      const { error } = await supabase
        .from("wishlist_items")
        .insert([{ user_id: student_id, course_id, added_at: new Date() }])
        .select();
      setActions((val) => !val);

      if (error) {
        toast.error("Failed to add course to wishlist");
      } else {
        toast.success("Course added to wishlist successfully");
        router.refresh();
      }
    } else {
      toast.error("Please log in to add this course to wishlist");
      router.push("/signin");
    }
  }

  async function deleteFromWishlist() {
    if (student_id) {
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", student_id)
        .eq("course_id", course_id);
      setActions((val) => !val);
      if (error) {
        toast.error("Failed to delete course to wishlist");
      } else {
        toast.success("Course deleted to wishlist successfully");
        router.refresh();
      }
    } else {
      toast.error("Please log in to delete this course to wishlist");
      router.push("/signin");
    }
  }

  async function deleteFromCart() {
    if (student_id) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", student_id)
        .eq("course_id", course_id);
      setActions((val) => !val);
      if (error) {
        toast.error("Failed to delete course to cart");
      } else {
        toast.success("Course deleted to cart successfully");
        router.refresh();
      }
    } else {
      toast.error("Please log in to delete this course to cart");
      router.push("/signin");
    }
  }

  useEffect(() => {
    async function check() {
      const { data } = await supabase
        .from("cart_items")
        .select()
        .eq("user_id", student_id)
        .eq("course_id", course_id);
      if (data) setIsInCart(data?.length > 0 ? true : false);
    }
    check();
  }, [isInCart, actions]);

  useEffect(() => {
    async function check() {
      const { data } = await supabase
        .from("wishlist_items")
        .select()
        .eq("user_id", student_id)
        .eq("course_id", course_id);
      if (data) setIsInWishlist(data?.length > 0 ? true : false);
    }
    check();
  }, [isInWishlist, actions]);

  return (
    <aside className="bg-white shadow p-6 h-fit">
      <div
        className={`text-center ${
          (role === "student" || role === null) && "mb-6"
        }`}
      >
        {price == 0 ? (
          <p className="text-3xl font-bold capitalize">free</p>
        ) : (
          <>
            <p className="text-3xl font-bold">{discountPrice} EGP</p>
            <p className="text-gray-400 line-through">{price} EGP</p>
          </>
        )}
      </div>
      {(role === "student" || role === null) && (
        <div className="relative flex gap-1 items-center">
          <Button
            disabled={isEnrolled}
            classes={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${isEnrolled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-blue-700 transition"}`}
            clickedFun={() => enrollNow()}
          >
            {isEnrolled ? <Spinner /> : "Enroll Now"}
          </Button>
          <div>
            <BsThreeDotsVertical
              size={24}
              className="cursor-pointer"
              onClick={() => setActions((val) => !val)}
            />
            {actions && (
              <div className="absolute bg-white p-2 shadow flex flex-col gap-2 right-6 -top-4">
                <Button
                  clickedFun={isInCart ? deleteFromCart : addToCart}
                  classes="bg-gray-100 hover:bg-gray-200"
                >
                  {isInCart ? "remove from cart" : "add to cart"}
                </Button>
                <Button
                  clickedFun={isInWishlist ? deleteFromWishlist : addToWishlist}
                  classes="bg-gray-100 hover:bg-gray-200"
                >
                  {isInWishlist ? "remove from wishlist" : "add to wishlist"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
