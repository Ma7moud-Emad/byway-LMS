"use client";
import { supabase } from "@/lib/supabase/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { IoSearchSharp } from "react-icons/io5";
import Spinner from "../ui/Spinner";
import { HiBars3 } from "react-icons/hi2";
import Link from "next/link";

export default function SearchBar({
  setToggleMenu,
}: {
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchCourses, setSearchCourses] = useState<
    { id: string; title: string }[] | null
  >(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  // results menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultRef.current &&
        !resultRef.current.contains(event.target as Node)
      ) {
        setSearchCourses(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // search courses
  async function search() {
    setIsSearch(true);

    const { data } = await supabase.rpc("search_courses", {
      search_text: searchText,
    });
    setSearchCourses(data);

    setIsSearch(false);
  }

  return (
    <div className="relative flex gap-4 flex-1">
      {/* input search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchText !== "") {
            search();
          }
        }}
        className="flex p-2 py-1.5 border border-gray-700 rounded-sm flex-1"
      >
        <input
          name="search"
          id="searchCourse"
          suppressHydrationWarning
          type="text"
          placeholder="Search Courses..."
          className="w-full text-sm bg-transparent outline-none pr-2 placeholder:text-md placeholder:text-gray-700"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <Button classes="" padding="p-0" type="submit">
          <IoSearchSharp size={20} color="#364153" />
        </Button>
      </form>

      {/* result menu */}
      <div
        ref={resultRef}
        className={`absolute top-11 left-0 w-full bg-white rounded-b-xl shadow ${isSearch && "min-h-50 flex justify-center items-center"}`}
      >
        {isSearch ? (
          <Spinner size="lg" color="text-blue-500" />
        ) : searchCourses && searchCourses.length > 0 ? (
          <ul className="space-y-2 p-4">
            {searchCourses.map((course) => {
              return (
                <li
                  key={course.id}
                  className="text-gray-900 font-medium bg-blue-50 hover:bg-blue-100 rounded-sm cursor-pointer transition-colors duration-200"
                >
                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full p-2 block"
                  >
                    {course.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          searchCourses &&
          searchCourses.length == 0 && (
            <p className="font-bold text-l text-gray-500 text-center capitalize py-14">
              No courses found
            </p>
          )
        )}
      </div>

      {/* bars icon */}
      <Button
        id="toggleOpen"
        classes="sm:hidden cursor-pointer"
        clickedFun={() => setToggleMenu((val) => !val)}
        padding="p-0"
      >
        <HiBars3 size={32} color="#364153" />
      </Button>
    </div>
  );
}
