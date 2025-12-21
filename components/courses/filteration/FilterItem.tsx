"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function FilterItem({
  title,
  param,
  items,
  type = "checkbox",
}: {
  title: string;
  param: string;
  items: string[];
  type?: "checkbox" | "radio";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedFromParams = searchParams.get(param)?.split(",") || [];
  const [selectedValues, setSelectedValues] =
    useState<string[]>(selectedFromParams);

  const [open, setOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const toggleValue = (value: string) => {
    let newValues: string[];

    if (type === "radio") {
      newValues = [value];
    } else {
      newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    }

    setSelectedValues(newValues);

    const params = new URLSearchParams(searchParams.toString());
    if (newValues.length) {
      params.set(param, newValues.join(","));
    } else {
      params.delete(param);
    }

    router.push(`?${params.toString()}`);
  };

  const handleShowMore = () => {
    if (visibleCount >= items.length) {
      setVisibleCount(4);
    } else {
      setVisibleCount((v) => Math.min(v + 4, items.length));
    }
  };

  return (
    <div className="mb-4 w-full">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold capitalize">{title}</h3>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-lg cursor-pointer"
          aria-label="toggle filter"
        >
          {open ? <LuChevronUp /> : <LuChevronDown />}
        </button>
      </div>

      {/* ===== Body ===== */}
      {open && (
        <>
          <ul className="space-y-2">
            {items.slice(0, visibleCount).map((item) => (
              <li key={item}>
                <label
                  className="flex gap-2 items-center cursor-pointer"
                  htmlFor={`${param}-${item}`}
                >
                  <input
                    type={type}
                    name={param}
                    id={`${param}-${item}`}
                    checked={selectedValues.includes(item)}
                    onChange={() => toggleValue(item)}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{item}</span>
                </label>
              </li>
            ))}
          </ul>

          {/* ===== Footer ===== */}
          {items.length > 4 && (
            <button
              onClick={handleShowMore}
              className="mt-2 text-sm font-semibold text-blue-600 flex items-center gap-1 cursor-pointer"
            >
              {visibleCount >= items.length ? (
                <>
                  See less <LuChevronUp />
                </>
              ) : (
                <>
                  See more <LuChevronDown />
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
