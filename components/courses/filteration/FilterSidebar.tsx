"use client";

import { Filter } from "@/lib/types";
import FilterItem from "./FilterItem";
import { RatingStars } from "@/components/shared/Stars";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const filters: Filter[] = [
  {
    title: "Rating",
    param: "rating",
    items: [
      { value: "1", label: <RatingStars rating={1} /> },
      { value: "2", label: <RatingStars rating={2} /> },
      { value: "3", label: <RatingStars rating={3} /> },
      { value: "4", label: <RatingStars rating={4} /> },
      { value: "5", label: <RatingStars rating={5} /> },
    ],
    type: "radio",
  },
  {
    title: "Total Hours",
    param: "total_hours",
    items: [
      { value: "1", label: "0-1 Hour" },
      { value: "2", label: "1-2 Hour" },
      { value: "3", label: "2-3 Hour" },
      { value: "4", label: "3-4 Hours" },
      { value: "5", label: "4-5 Hours" },
      { value: "6", label: "5-6 Hours" },
      { value: "7", label: "6-7 Hours" },
      { value: "8", label: "7-8 Hours" },
      { value: "9", label: "8-9 Hours" },
      { value: "10", label: "9-10 Hours" },
      { value: "+10", label: "+10 Hours" },
    ],
    type: "radio",
  },
  {
    title: "Language",
    param: "language",
    items: [
      { value: "english", label: "english" },
      { value: "arabic", label: "arabic" },
      { value: "spanish", label: "spanish" },
      { value: "french", label: "french" },
      { value: "german", label: "german" },
      { value: "chinese", label: "chinese" },
      { value: "japanese", label: "japanese" },
      { value: "korean", label: "korean" },
      { value: "italian", label: "italian" },
    ],
  },
  {
    title: "Level",
    param: "level",
    items: [
      { value: "beginner", label: "beginner" },
      { value: "intermediate", label: "intermediate" },
      { value: "advanced", label: "advanced" },
    ],
  },
  {
    title: "Price",
    param: "price",
    items: [
      { value: "paid", label: "paid" },
      { value: "free", label: "free" },
    ],
  },
];

export default function FilterSidebar() {
  const [filtertion, setFiltertion] = useState(filters);

  // fetch categories
 useEffect(() => {
  const getPrograms = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id,title");

    if (error) throw error;

    setFiltertion((prev) => {
      const alreadyExists = prev.some(
        (f) => f.param === "programs"
      );

      if (alreadyExists) return prev;

      return [
        {
          title: "Programs",
          param: "programs",
          type: "radio",
          items: data?.map((item) => ({
            value: item.id,
            label: item.title,
          })),
        },
        ...prev,
      ];
    });
  };

  getPrograms();
}, []);

  return (
    <div className="pr-4">
      {filtertion.map((filter) => (
        <FilterItem
          key={filter.param}
          title={filter.title}
          param={filter.param}
          items={filter.items}
          type={filter.type}
        />
      ))}
    </div>
  );
}
