import CreateForm from "@/components/forms/CreateForm";
import { supabase } from "@/lib/supabase/client";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;

  const { data, error } = await supabase
    .from("courses")
    .select(
      `
    *,
    modules(*,lessons(*))
  `,
    )
    .eq("id", courseId)
    .single();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Edit</h1>

      <CreateForm
        course={{
          ...data,
          languages: data.languages.map((item: string) => {
            return { value: item };
          }),
          requirements: data.requirements.map((item: string) => {
            return { value: item };
          }),
          learning_outcomes: data.learning_outcomes.map((item: string) => {
            return { value: item };
          }),
          tags: data.tags.map((item: string) => {
            return { value: item };
          }),
        }}
      />
    </div>
  );
}
