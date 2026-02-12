"use client";

import Image from "next/image";
import Link from "next/link";
import { BannerProps } from "@/lib/types";

export default function BannerCard({
  image,
  title,
  description,
  ctaText,
  ctaHref,
  priority,
}: BannerProps) {
  return (
    <div className="p-4 h-[94vh] sm:h-[90vh] flex flex-col gap-8 sm:flex-row-reverse sm:items-center justify-center">
      <div className="relative sm:w-1/2 h-[300px] sm:h-[400px]">
        <Image
          priority={priority}
          src={image}
          alt="banner"
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>
      <div className="space-y-4 sm:w-1/2">
        <h2 className="text-3xl font-bold capitalize text-gray-900">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
        {ctaHref && (
          <Link
            href={ctaHref}
            className="rounded-sm bg-gray-900 text-gray-50 font-semibold px-4 py-2 inline-block"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
