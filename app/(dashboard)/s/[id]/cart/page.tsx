"use server";

import CartTable from "@/components/dashboard/student/CartTable";
import NotFound from "@/components/dashboard/student/NotFound";
import { supabase } from "@/lib/supabase/client";

type CartItem = {
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

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data, error } = (await supabase
    .from("cart_items")
    .select("*,courses(title,poster,price,discount_price)")
    .eq("user_id", id)) as {
    data: CartItem[];
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
        <NotFound
          heading="No courses in your cart"
          msg="Browse courses and add the ones you like to your cart"
          href="/courses"
          btnText="View courses"
        />
      )}
    </div>
  );
}
