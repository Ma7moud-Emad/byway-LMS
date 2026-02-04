import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabase/client";
import { ReactNode } from "react";

export default async function Wrapper({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: ReactNode;
}) {
  const { id } = await params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url, role")
    .eq("id", id)
    .single();

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Sidebar profile={profile} />
      <main className="bg-[#F8FAFC] p-4 overflow-auto">{children}</main>
    </div>
  );
}
