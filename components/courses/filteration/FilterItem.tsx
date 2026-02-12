"use client";

import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function FilterItem({
  title,
  param,
  items,
  type = "checkbox",
}: {
  title: string;
  param: string;
  items: { value: string; label: ReactNode }[];
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
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold capitalize">{title}</h3>
        <Button
          classes="text-lg cursor-pointer"
          clickedFun={() => setOpen((val) => !val)}
        >
          {open ? <LuChevronUp /> : <LuChevronDown />}
        </Button>
      </div>

      {open && (
        <>
          <ul className="space-y-2">
            {items.slice(0, visibleCount).map((item) => (
              <li key={item.value}>
                <label className="flex gap-2 items-center cursor-pointer">
                  <input
                    type={type}
                    name={param}
                    checked={selectedValues.includes(item.value)}
                    onChange={() => toggleValue(item.value)}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{item.label}</span>
                </label>
              </li>
            ))}
          </ul>

          {items.length > 4 && (
            <Button classes="-ml-4 mt-2" clickedFun={handleShowMore}>
              {visibleCount >= items.length ? (
                <p className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                  See less <LuChevronUp />
                </p>
              ) : (
                <p className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                  See more <LuChevronDown />
                </p>
              )}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
