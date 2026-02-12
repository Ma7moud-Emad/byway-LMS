"use client";

import { ReactNode, useState } from "react";

import FilterSidebar from "@/components/courses/filteration/FilterSidebar";
import FilterHeader from "./FilterHeader";

export default function FilterPageClient({
  children,
}: {
  children: ReactNode;
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen px-6 py-4">
      <FilterHeader filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

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
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden text-gray-900"
            onClick={() => setFilterOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="border-b border-gray-500 max-md:w-3/5 bg-white h-screen overflow-y-scroll"
            >
              <div className="px-4 py-2">
                <FilterSidebar />
              </div>
            </div>
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
