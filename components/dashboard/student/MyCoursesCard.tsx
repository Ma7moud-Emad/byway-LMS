import Image from "next/image";
import Link from "next/link";
import Progress from "./Progress";

export default function MyCoursesCard({
  poster,
  title,
  short_description,
  id,
  progress_percentage,
}: {
  id: string;
  poster: string;
  title: string;
  short_description: string;
  progress_percentage: number;
}) {
  return (
    <Link
      href={`/courses/${id}`}
      key={id}
      className="block bg-white shadow hover:shadow-lg transition"
    >
      {/* Poster */}
      <div className="relative h-60 w-full">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

        <p className="text-gray-500 pt-1 line-clamp-2">{short_description}</p>

        {/* Progress */}
        <Progress
          progress_percentage={progress_percentage}
          progressColor="text-gray-900"
        />
        <button
          suppressHydrationWarning
          className="bg-blue-700 text-gray-50 text-center font-semibold mt-4 p-2 w-full cursor-pointer"
        >
          View Course
        </button>
      </div>
    </Link>
  );
}
