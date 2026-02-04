import CreateForm from "@/components/forms/CreateForm";

export default async function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Course</h1>
      <CreateForm />
    </div>
  );
}
