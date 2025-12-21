import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { BannerProps } from "@/lib/types";

export default function BannerCard({
  image,
  title,
  description,
  ctaText,
  ctaHref,
}: BannerProps) {
  return (
    <div className="p-4 h-[94vh] sm:h-[90vh] flex flex-col gap-8 sm:flex-row-reverse sm:items-center justify-center">
      <div className="sm:w-1/2">
        <Image src={image} alt="banner" />
      </div>
      <div className="space-y-4 sm:w-1/2">
        <h2 className="text-3xl font-bold capitalize text-gray-900">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
        {ctaHref && (
          <Button classes="rounded-sm bg-[#3B82F6] text-gray-50 text-sm font-semibold">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
