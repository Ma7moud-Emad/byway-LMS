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
    <header className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <button onClick={toggleFilter} className={btnStyle}>
          {filterOpen ? <GoArrowLeft /> : <LuSlidersHorizontal />}
          Filter
        </button>

        <button onClick={toggleSort} className={btnStyle}>
          <LuArrowUpDown />
          Sort
        </button>
      </div>
      <p className="text-sm text-gray-500">Results</p>
    </header>
  );
}
