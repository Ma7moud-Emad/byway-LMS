import { InstruictorProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function InstructorCard({
  id,
  name,
  avatar,
  username,
  headline,
}: InstruictorProps) {
  return (
    <section className="text-gray-900">
      <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
      <div className="flex items-start gap-4">
        <Image
          src={avatar}
          alt={name}
          width={80}
          height={80}
          className="rounded-sm"
          unoptimized
        />
        <div>
          <h3 className="font-semibold capitalize">{name}</h3>
          <p className="text-sm text-gray-500">{headline}</p>
          <Link href={`/instructors/${id}`} className="text-gray-500 text-sm">
            @ <span className="underline">{username}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
