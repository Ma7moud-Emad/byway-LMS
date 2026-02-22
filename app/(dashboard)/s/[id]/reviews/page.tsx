import NotFound from "@/components/dashboard/student/NotFound";
import ReviewsTable from "@/components/dashboard/student/ReviewsTable";
import { supabase } from "@/lib/supabase/client";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("reviews")
    .select("id,comment,rating,courses(title)")
    .eq("user_id", id);

  if (error) return <p>{error.message}</p>;

  const ts_data = data.map((item) => {
    return {
      ...item,
      courses: Array.isArray(item.courses) ? item.courses[0] : item.courses,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
      {data && data.length > 0 ? (
        <ReviewsTable data={ts_data} />
      ) : (
        <NotFound
          heading="No reviews available"
          msg="Your course reviews will appear here once you submit them"
          href="/courses"
          btnText="View courses"
        />
      )}
    </div>
  );
}
