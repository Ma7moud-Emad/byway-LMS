"use client";

import { useState } from "react";
import FilterSidebar from "@/components/courses/filteration/FilterSidebar";
import SortMenu from "@/components/courses/filteration/SortMenu";
import FilterHeader from "./FilterHeader";
import { LuX } from "react-icons/lu";

export default function FilterPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filterOpen, setFilterOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen((v) => !v);
  };

  const toggleSort = () => {
    setSortOpen((v) => !v);
  };

  return (
    <div className="min-h-screen px-6 py-4">
      <FilterHeader
        filterOpen={filterOpen}
        toggleFilter={toggleFilter}
        toggleSort={toggleSort}
      />

      <div className="relative flex">
        <aside
          className={`
                    hidden md:block transition-all duration-300
                    ${filterOpen ? "w-1/6" : "w-0 overflow-hidden"}
                  `}
        >
          <FilterSidebar />
        </aside>

        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:bg-white md:hidden text-gray-900">
            <div className="flex items-center justify-between p-4 border-b border-gray-500 max-md:w-3/4 bg-white">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-lg cursor-pointer"
              >
                <LuX className="text-2xl text-red-500" />
              </button>
            </div>

            <div className="p-4 h-[calc(100vh-57px)] overflow-y-auto max-md:w-3/4 bg-white">
              <FilterSidebar />
            </div>
          </div>
        )}

        {sortOpen && (
          <div className="absolute top-0 left-23 z-40 bg-white rounded shadow-2xl border border-gray-300 md:left-32">
            <SortMenu setIsSort={setSortOpen} />
          </div>
        )}
        <main
          className={`
            transition-all duration-300
            ${filterOpen ? "md:w-5/6" : "md:w-full"}
            w-full
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
