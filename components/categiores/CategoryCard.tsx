import { CategoryCardProps } from "@/lib/types";
import Link from "next/link";

export default function CategoryCard({
  id,
  title,
  count,
  Icon,
}: CategoryCardProps) {
  return (
    <Link
      href={`/courses?programs=${id}`}
      className="rounded-2xl shadow-blue-light p-4 border-2 border-[#E2E8F0] text-center"
    >
      <p className="text-3xl text-blue-500 p-4 rounded-full bg-blue-100 w-fit mx-auto">
        <Icon />
      </p>
      <div>
        <h4 className="font-bold text-xl text-gray-900">{title}</h4>
        <p className="text-gray-500">{count} courses</p>
      </div>
    </Link>
  );
}
