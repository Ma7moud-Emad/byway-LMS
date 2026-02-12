"use server";

import CartTable from "@/components/dashboard/student/CartTable";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data, error } = (await supabase
    .from("cart_items")
    .select("*,courses(title,poster,price,discount_price)")
    .eq("user_id", id)) as {
    data: {
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
    }[];
    error: Error | null;
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Cart</h1>
      {data && data.length > 0 ? (
        <CartTable data={data} />
      ) : (
        <div className="text-center mt-20">
          <h3 className=" capitalize font-semibold text-xl text-gray-900">
            No courses in your cart
          </h3>
          <p className=" text-gray-700 mb-4">
            Browse courses and add the ones you like to your cart
          </p>
          <Button>
            <Link href="/courses">View courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
