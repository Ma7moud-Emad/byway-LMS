"use client";

import { ReactNode, useState } from "react";

export default function Settings({
  childOne,
  childTwo,
}: {
  childOne: ReactNode;
  childTwo: ReactNode;
}) {
  const [active, setActive] = useState<"profile" | "password">("profile");

  return (
    <>
      <ul className="flex items-center gap-4 font-medium text-lg text-gray-900 bg-white shadow rounded-lg px-4 py-2 mt-4 w-fit capitalize">
        <li
          className={`px-2 py-1 cursor-pointer rounded-sm ${active == "profile" && "text-gray-50 bg-blue-500"}`}
          onClick={() => {
            setActive("profile");
          }}
        >
          profile infomation
        </li>
        <li
          className={`px-2 py-1 cursor-pointer rounded-sm ${active == "password" && "text-gray-50 bg-blue-500"}`}
          onClick={() => {
            setActive("password");
          }}
        >
          change password
        </li>
      </ul>
      {active == "profile" ? childOne : childTwo}
    </>
  );
}
