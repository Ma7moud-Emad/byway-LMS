"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { AlignJustify, Search, X } from "@deemlol/next-icons";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Spinner from "../ui/Spinner";

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchCourses, setSearchCourses] = useState<
    { id: string; title: string }[] | null
  >(null);

  const divRef = useRef<HTMLDivElement | null>(null);

  function handelToggle() {
    setToggleMenu((state) => !state);
  }

  // check user is login
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("User fetch error:", error.message);
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // fetch profile based on user
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  // menu of search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
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
    <header className="flex shadow-md py-3 px-4 bg-white tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 max-sm:flex-1 sm:w-3/5">
          {/* logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="logo" className="w-6" />
            <p className="text-xl text-gray-700 capitalize font-bold">byway</p>
          </Link>
          <div className="relative flex gap-4 flex-1">
            {/* search */}
            <div className="flex px-4 py-1.5 border border-gray-700 rounded-sm flex-1">
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search Courses..."
                className="w-full text-sm bg-transparent outline-none pr-2 placeholder:text-md placeholder:text-gray-700"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <Search
                size={20}
                color="#364153"
                className="cursor-pointer"
                onClick={() => {
                  if (searchText !== "") {
                    search();
                  }
                }}
              />
            </div>

            {/* results of search */}
            <div
              ref={divRef}
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

            {/* menu icon */}
            <button
              suppressHydrationWarning
              id="toggleOpen"
              className="sm:hidden cursor-pointer"
              onClick={handelToggle}
            >
              <AlignJustify size={24} color="#364153" />
            </button>
          </div>
        </div>
        {/* mobile */}
        <div
          id="collapseMenu"
          className={`${
            toggleMenu ? "hidden" : "block"
          } max-sm:w-full max-sm:fixed max-sm:before:fixed max-sm:before:bg-black max-sm:before:opacity-50 max-sm:before:inset-0 max-sm:before:z-50 sm:block`}
        >
          {/* x icon */}
          <button
            suppressHydrationWarning
            id="toggleClose"
            className="sm:hidden fixed top-2 right-4 z-100 rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
            onClick={handelToggle}
          >
            <X size={24} color="black" />
          </button>
          {/* menu */}
          <ul className="sm:flex sm:gap-x-4 max-sm:space-y-2 max-sm:fixed max-sm:bg-white max-sm:w-1/2 max-sm:min-w-[300px] max-sm:top-0 max-sm:left-0 max-sm:p-6 max-sm:h-full max-sm:shadow-md max-sm:overflow-auto z-50">
            <li className="mb-6 hidden max-sm:block ">
              <Link href="/" className="flex items-center">
                <Image src={logo} alt="logo" className="w-6" />
                <p className="text-xl text-gray-700 capitalize font-bold">
                  byway
                </p>
              </Link>
            </li>
            {user ? (
              <li className="sm:rounded-sm sm:border sm:border-gray-700 sm:bg-gray-700 sm:text-gray-50 sm:px-2 sm:py-1 capitalize max-sm:border-b max-sm:border-gray-300 px-3 max-sm:hover:bg-gray-100">
                <Link
                  href={`/${profile?.role.charAt(0)}/${user?.id}/dashboard`}
                  className="font-medium block max-sm:py-3"
                >
                  dashboard
                </Link>
              </li>
            ) : (
              <>
                <li className="sm:rounded-sm sm:border sm:border-gray-700 sm:px-2 sm:py-1 capitalize max-sm:border-b max-sm:border-gray-300  px-3 max-sm:hover:bg-gray-100">
                  <Link
                    href="/signin"
                    className="font-medium block max-sm:py-3"
                  >
                    log in
                  </Link>
                </li>
                <li className="sm:rounded-sm sm:border sm:border-gray-700 sm:bg-gray-700 sm:text-gray-50 sm:px-2 sm:py-1 capitalize max-sm:border-b max-sm:border-gray-300 px-3 max-sm:hover:bg-gray-100">
                  <Link
                    href="/signup"
                    className="font-medium block max-sm:py-3"
                  >
                    sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
