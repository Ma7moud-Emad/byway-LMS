"use client";

import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

type Course = {
  id: string;
  user_id: string;
  course_id: string;
  added_at: string;
  courses: {
    title: string;
    poster: string;
    price: number;
    discount_price: number;
  };
};
export default function CartTable({ data }: { data: Course[] }) {
  const router = useRouter();
  async function delItem(course_id: string, user_id: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user_id)
      .eq("course_id", course_id);

    if (error) {
      toast.error("Failed to removed");
    } else {
      toast.success("Removed course successfully");
      router.refresh();
    }
  }
  async function enrolled(courses: Course[]) {
    try {
      //  insert enrollments
      const { error: enrollError } = await supabase.from("enrollments").insert(
        courses.map((course) => ({
          course_id: course.course_id,
          student_id: course.user_id,
        })),
      );

      if (enrollError) throw enrollError;

      //  delete cart_items
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .in(
          "course_id",
          courses.map((course) => course.course_id),
        )
        .eq("user_id", courses[0].user_id);

      if (deleteError) throw deleteError;

      toast.success("Enrolled successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to enroll courses");
      console.error(error);
    }
  }

  return (
    <table className="w-full overflow-x-scroll mt-4">
      <thead className="bg-blue-500 text-white">
        <tr className="[&>th]:capitalize [&>th]:text-start [&>th]:p-2 [&>th]:whitespace-nowrap">
          <th>poster</th>
          <th>title</th>
          <th>price</th>
          <th>price after discount</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody className="[&>tr>td]:p-2 [&>tr]:even:bg-blue-100 [&>tr>td]:whitespace-nowrap">
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <Image
                src={item.courses.poster}
                alt={item.courses.title}
                width={100}
                height={100}
              />
            </td>
            <td>{item.courses.title}</td>
            <td>${item.courses.price}</td>
            <td>${item.courses.discount_price}</td>
            <td>
              <MdDelete
                size={24}
                color="red"
                className="cursor-pointer"
                onClick={() => delItem(item.course_id, item.user_id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className=" text-end capitalize p-2 font-semibold">
            total courses: {data.length}
          </td>
          <td className="p-2 whitespace-nowrap">
            <Button clickedFun={() => enrolled(data)}>enroll now</Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
