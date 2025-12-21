import InstructorDetails from "@/components/instructors/InstructorDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <InstructorDetails id={id} />;
}
