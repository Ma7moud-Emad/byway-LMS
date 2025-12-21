"use client";

import { Filter } from "@/lib/types";
import FilterItem from "./FilterItem";

const filters: Filter[] = [
  {
    title: "Rating",
    param: "rating",
    items: ["up to 1", "up to 2", "up to 3", "up to 4", "up to 5"],
    type: "radio",
  },
  {
    title: "Total Hours",
    param: "total_hours",
    items: ["up to 5", "up to 10", "up to 15", "up to 20", "up to 25", "25+"],
    type: "radio",
  },
  {
    title: "Language",
    param: "language",
    items: [
      "english",
      "arabic",
      "spanish",
      "french",
      "german",
      "chinese",
      "japanese",
      "korean",
      "italian",
      "portuguese",
      "russian",
      "hindi",
      "turkish",
      "persian",
      "swahili",
    ],
  },
  {
    title: "Level",
    param: "level",
    items: ["beginner", "intermediate", "advanced"],
  },
  {
    title: "Price",
    param: "price",
    items: ["paid", "free"],
  },
  {
    title: "Discount",
    param: "discount",
    items: [
      "up to 10%",
      "up to 12%",
      "up to 30%",
      "up to 40%",
      "up to 50%",
      "up to 60%",
      "up to 70%",
      "up to 80%",
      "up to 90%",
    ],
  },
];

export default function FilterSidebar() {
  return (
    <div className="pr-4">
      {filters.map((filter) => (
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
