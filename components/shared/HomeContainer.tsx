import Link from "next/link";
import { HomeContainerProps } from "@/lib/types";

export default function HomeContainer({
  title,
  ctaHref,
  children,
}: HomeContainerProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize text-gray-900">{title}</h1>
        {ctaHref && (
          <Link
            href={ctaHref}
            className="text-blue-500 capitalize font-semibold"
          >
            see all
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
