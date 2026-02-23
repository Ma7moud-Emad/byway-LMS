import ReviewsTable, {
  Review,
} from "@/components/dashboard/instructor/ReviewsTable";
import { supabase } from "@/lib/supabase/client";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      comment,
      rating,
      courses!inner (
        title
      )
      ,profiles!inner(full_name)
    `,
    )
    .eq("courses.instructor_id", id);

  if (error) {
    console.error("Error fetching reviews:", error);
    return <div>Error loading reviews.</div>;
  }

  const ts_data: Review[] = data.map((review) => {
    return {
      ...review,
      courses: Array.isArray(review.courses)
        ? review.courses[0]
        : review.courses,
      profiles: Array.isArray(review.profiles)
        ? review.profiles[0]
        : review.profiles,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h1>
      {ts_data && ts_data.length > 0 ? (
        <ReviewsTable data={ts_data} />
      ) : (
        <p className="text-xl text-gray-700 text-center font-semibold mt-50 capitalize">
          No reviews found for your courses
        </p>
      )}
    </div>
  );
}
