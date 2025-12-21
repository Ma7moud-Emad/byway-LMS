import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

type InstructorCardProps = {
  avg_rating: number;
  total_students: number;
  id: string;
  type?: string;
};
export default async function InstructorCard({
  avg_rating,
  total_students,
  id,
}: InstructorCardProps) {
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  const { data: instructor } = await supabase
    .from("instructors")
    .select("*")
    .eq("id", id)
    .single();

  const { avatar_url, username }: { avatar_url: string; username: string } =
    profiles;

  const { headline } = instructor;

  return (
    <Link
      href={`/instructors/${id}`}
      className="rounded-2xl shadow-blue-light p-4 border-2 border-[#E2E8F0] text-gray-900"
    >
      <figure className="relative h-50 rounded-lg overflow-hidden ">
        <Image
          src={avatar_url}
          alt={username}
          fill
          className="object-top object-cover"
        />
      </figure>
      <div>
        <h4 className="font-bold text-xl pt-2 capitalize text-center">
          {username}
        </h4>
        <p className="text-sm text-gray-700 text-center">{headline}</p>
        <div className="flex items-center justify-between border-t-2 border-t-[#E2E8F0] mt-2 pt-2 mx-4">
          <p className="flex gap-1 items-center font-bold">
            <FaStar className="text-yellow-500" />
            {avg_rating}
          </p>
          <p className="text-gray-700 text-sm">{total_students} Students</p>
        </div>
      </div>
    </Link>
  );
}
