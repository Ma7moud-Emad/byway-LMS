import ChangePass from "@/components/forms/ChangePass";
import InstructorForm from "@/components/forms/InstructorForm";
import ProfileForm from "@/components/forms/ProfileForm";
import { supabase } from "@/lib/supabase/client";

export default async function Page({ params }: { params: { id: string } }) {
  const { id: instructorID } = await params;

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        *,
        instructors(*)
        `,
    )
    .eq("id", instructorID)
    .single();

  if (error) {
    console.error("Error fetching instructor:", error.message);
    return;
  }

  //   Destructure profile and instructor data
  const {
    id,
    avatar_url,
    email,
    username,
    full_name,
    phone,
    bio,
    instructors,
  } = data;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      <h2 className="text-xl font-bold text-gray-900 mt-8">Profile</h2>
      <ProfileForm
        profile={{ id, avatar_url, email, username, full_name, phone, bio }}
      />

      <h2 className="text-xl font-bold text-gray-900 mt-8">
        Instructor Information
      </h2>
      <InstructorForm
        instructor={{
          ...instructors,
          expertise: instructors.expertise.join(", "),
        }}
      />

      <h2 className="text-xl font-bold text-gray-900 mt-8">Change Password</h2>
      <ChangePass />
    </div>
  );
}
