"use client";

import { GoArrowLeft } from "react-icons/go";
import { LuArrowUpDown, LuSlidersHorizontal } from "react-icons/lu";
import SortMenu from "./SortMenu";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

export default function FilterHeader({
  filterOpen,
  setFilterOpen,
}: {
  filterOpen: boolean;
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    };

    if (sortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortOpen]);

  return (
    <header className="flex items-center justify-between mb-4 w-fit relative">
      <div className="flex gap-2">
        <Button
          classes="flex items-center gap-1 border px-3 py-1 rounded font-semibold cursor-pointer"
          clickedFun={() => setFilterOpen((val) => !val)}
        >
          {filterOpen ? <GoArrowLeft /> : <LuSlidersHorizontal />}
          Filter
        </Button>

        <Button
          classes="flex items-center gap-1 border px-3 py-1 rounded font-semibold cursor-pointer"
          clickedFun={() => setSortOpen((val) => !val)}
        >
          <LuArrowUpDown />
          Sort
        </Button>
      </div>

      {sortOpen && (
        <div
          ref={sortMenuRef}
          className="absolute top-13 left-23 z-40 bg-white rounded shadow-2xl border border-gray-900 before:absolute before:border-10 before:border-transparent before:border-t-gray-900 before:-top-3.5 before:left-2"
        >
          <SortMenu setIsSort={setSortOpen} />
        </div>
      )}
    </header>
  );
}
