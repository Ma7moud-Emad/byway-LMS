import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomerCard from "./CustomerCard";

export default function Customers() {
  return (
    <div className="px-4 py-8 bg-[#F8FAFC]">
      {/* header */}
      <div className="flex justify-between pb-8">
        <h1 className="font-bold text-gray-900 text-2xl">
          What Our Customer Say <br /> About Us
        </h1>
        <div className="flex gap-2 items-start pt-2.5">
          <button
            suppressHydrationWarning
            className="bg-gray-400 px-3 py-1.5 rounded-sm text-white cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            suppressHydrationWarning
            className="bg-gray-400 px-3 py-1.5 rounded-sm text-white cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-nowrap gap-4 overflow-x-scroll hide-scrollbar">
        {Array.from({ length: 10 }).map((_, ind) => {
          return (
            <div
              key={ind}
              className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 shrink-0"
            >
              <CustomerCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
