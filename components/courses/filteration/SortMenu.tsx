"use client";

import { SortOptions } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortMenu({
  setIsSort,
}: {
  setIsSort: (value: boolean) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions: SortOptions[] = [
    { label: "Most popular", value: "most_popular" },
    { label: "Highest Rating", value: "rating_desc" },
    { label: "Newest", value: "newest" },
  ];

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-48">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            setSort(option.value);
            setIsSort(false);
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
