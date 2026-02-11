"use client";

import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

export default function CustomerCard({
  comment,
  userName,
  avatar_url,
}: {
  comment: string;
  userName: string;
  avatar_url: string;
}) {
  return (
    <div className="rounded-2xl shadow-blue-light p-4 border-2 border-gray-100 space-y-2 bg-white">
      <FaQuoteLeft className="text-2xl text-blue-500 ml-2 mb-2" />
      <h2 className="font-normal text-gray-700">{comment}</h2>
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 relative overflow-hidden rounded-full">
          <Image
            src={avatar_url}
            sizes="100%"
            fill
            alt="image"
            className="object-cover"
          />
        </div>
        <p className="capitalize text-gray-900 font-medium">{userName}</p>
      </div>
    </div>
  );
}
