"use client";

import Logo from "./Logo";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

export default function Mob_menu({
  toggleMenu,
  setToggleMenu,
  user,
  profile,
}: {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  profile: { role: string } | null;
}) {
  return (
    <div
      id="collapseMenu"
      className={`${
        toggleMenu ? "hidden" : "block"
      } max-sm:w-full max-sm:fixed max-sm:before:fixed max-sm:before:bg-black max-sm:before:opacity-50 max-sm:before:inset-0 max-sm:before:z-50 sm:block`}
      onClick={() => setToggleMenu((val) => !val)}
    >
      {/* menu */}
      <ul className="sm:flex sm:gap-x-4 max-sm:space-y-2 max-sm:fixed max-sm:bg-white max-sm:w-1/2 max-sm:min-w-[300px] max-sm:top-0 max-sm:left-0 max-sm:p-6 max-sm:h-full max-sm:shadow-md max-sm:overflow-auto z-50">
        <li className="mb-6 hidden max-sm:block ">
          <Logo />
        </li>
        {user ? (
          <Li
            cta="dashboard"
            href={`/${profile?.role.charAt(0)}/${user?.id}/dashboard`}
            is_bg={true}
          />
        ) : (
          <>
            <Li cta="log in" href="/signin" />
            <Li cta="sign up" href="/signup" is_bg={true} />
          </>
        )}
      </ul>
    </div>
  );
}

function Li({
  cta,
  href,
  is_bg = false,
}: {
  cta: string;
  href: string;
  is_bg?: boolean;
}) {
  return (
    <li
      className={`sm:rounded-sm sm:border sm:border-gray-700 sm:px-2 sm:py-1 capitalize max-sm:border-b max-sm:border-gray-300 px-3 max-sm:hover:bg-gray-100 ${is_bg && "sm:bg-gray-700 sm:text-gray-50"}`}
    >
      <Link href={href} className="font-medium block max-sm:py-3">
        {cta}
      </Link>
    </li>
  );
}
