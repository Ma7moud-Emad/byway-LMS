import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import Button from "../ui/Button";

import { FaArrowRightLong } from "react-icons/fa6";

export default function EndCTA({
  image,
  heading,
  paragrph,
  ctaLink,
  ctaTitle,
  dir = "left",
}: {
  image: StaticImageData;
  heading: string;
  paragrph: string;
  ctaLink: string;
  ctaTitle: string;
  dir?: "left" | "right";
}) {
  return (
    <div
      className={`max-sm:mb-10 sm:flex ${
        dir == "left" ? "flex-row" : "flex-row-reverse"
      } sm:items-center sm:gap-8 sm:justify-around`}
    >
      <div>
        <Image src={image} alt="image" className="max-sm:mb-12 " />
      </div>
      <div className="sm:w-[30%]">
        <h1 className="text-gray-900 font-bold mb-0 text-2xl capitalize">
          {heading}
        </h1>
        <p className="text-gray-500 mt-2 mb-4">{paragrph}</p>
        <Button>
          <Link href={ctaLink} className="flex items-center gap-2">
            <span> {ctaTitle}</span> <FaArrowRightLong />
          </Link>
        </Button>
      </div>
    </div>
  );
}
