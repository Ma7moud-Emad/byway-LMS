import Settings from "@/components/dashboard/instructor/Settings";
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
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <Settings
        childOne={
          <ProfileForm
            profile={{ id, avatar_url, email, username, full_name, phone, bio }}
          />
        }
        childTwo={
          <InstructorForm
            instructor={{
              ...instructors,
              expertise: instructors.expertise.join(", "),
            }}
          />
        }
        childThree={<ChangePass />}
      />
    </div>
  );
}
