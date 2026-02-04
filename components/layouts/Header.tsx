"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { AlignJustify, Search, X } from "@deemlol/next-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  function handelToggle() {
    setToggleMenu((state) => !state);
  }

  // fetch user
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

  return (
    <header className="flex shadow-md py-3 px-4 bg-white tracking-wide relative z-50">
      <div className="flex flex-wrap items-center gap-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" className="w-6" />
          <p className="text-xl text-gray-700 capitalize font-bold">byway</p>
        </Link>
        <div className="flex gap-4 flex-1">
          <div className="flex-1 flex px-4 py-1.5 border border-gray-700 rounded-sm">
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search Courses..."
              className="w-full text-sm bg-transparent outline-none pr-2 placeholder:text-md placeholder:text-gray-700"
            />
            <Search size={20} color="#364153" />
          </div>
          <button
            suppressHydrationWarning
            id="toggleOpen"
            className="md:hidden cursor-pointer"
            onClick={handelToggle}
          >
            <AlignJustify size={24} color="#364153" />
          </button>
        </div>
        <div
          id="collapseMenu"
          className={`${
            toggleMenu ? "hidden" : "block"
          } max-md:w-full max-md:fixed max-md:before:fixed max-md:before:bg-black max-md:before:opacity-50 max-md:before:inset-0 max-md:before:z-50 md:block`}
        >
          <button
            suppressHydrationWarning
            id="toggleClose"
            className="md:hidden fixed top-2 right-4 z-100 rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
            onClick={handelToggle}
          >
            <X size={24} color="black" />
          </button>

          <ul className="md:flex md:gap-x-4 max-md:space-y-2 max-md:fixed max-md:bg-white max-md:w-1/2 max-md:min-w-[300px] max-md:top-0 max-md:left-0 max-md:p-6 max-md:h-full max-md:shadow-md max-md:overflow-auto z-50">
            <li className="mb-6 hidden max-md:block ">
              <Link href="/" className="flex items-center">
                <Image src={logo} alt="logo" className="w-6" />
                <p className="text-xl text-gray-700 capitalize font-bold">
                  byway
                </p>
              </Link>
            </li>
            {user ? (
              <li className="md:border md:border-gray-700 md:bg-gray-700 md:text-gray-50 md:px-2 md:py-1 capitalize max-md:border-b max-md:border-gray-300 px-3 max-md:hover:bg-gray-100">
                <Link
                  href={`/${profile?.role.charAt(0)}/${user?.id}/dashboard`}
                  className="font-medium block max-md:py-3"
                >
                  dashboard
                </Link>
              </li>
            ) : (
              <>
                <li className="md:border md:border-gray-700 md:px-2 md:py-1 capitalize max-md:border-b max-md:border-gray-300  px-3 max-md:hover:bg-gray-100">
                  <Link
                    href="/signin"
                    className="font-medium block max-md:py-3"
                  >
                    log in
                  </Link>
                </li>
                <li className="md:border md:border-gray-700 md:bg-gray-700 md:text-gray-50 md:px-2 md:py-1 capitalize max-md:border-b max-md:border-gray-300 px-3 max-md:hover:bg-gray-100">
                  <Link
                    href="/signup"
                    className="font-medium block max-md:py-3"
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
