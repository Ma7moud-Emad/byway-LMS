import ChangePass from "@/components/forms/ChangePass";
import ProfileForm from "@/components/forms/ProfileForm";
import { supabase } from "@/lib/supabase/client";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <ProfileForm profile={data} />
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Change Password</h1>
      <ChangePass />
    </div>
  );
}
