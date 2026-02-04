"use client";

import { GoArrowLeft } from "react-icons/go";
import { LuArrowUpDown, LuSlidersHorizontal } from "react-icons/lu";

export default function FilterHeader({
  filterOpen,
  toggleFilter,
  toggleSort,
}: {
  filterOpen: boolean;
  toggleFilter: () => void;
  toggleSort: () => void;
}) {
  const btnStyle =
    "flex items-center gap-1 border px-3 py-1 rounded font-semibold cursor-pointer";

  return (
    <header className="flex items-center justify-between mb-4 w-fit">
      <div className="flex gap-2">
        {/* filter button is responsible for opening or closing the menu. */}
        <button
          suppressHydrationWarning
          onClick={toggleFilter}
          className={btnStyle}
        >
          {filterOpen ? <GoArrowLeft /> : <LuSlidersHorizontal />}
          Filter
        </button>

        {/* sort button is responsible for opening or closing the menu. */}
        <button
          suppressHydrationWarning
          onClick={toggleSort}
          className={btnStyle}
        >
          <LuArrowUpDown />
          Sort
        </button>
      </div>
    </header>
  );
}
