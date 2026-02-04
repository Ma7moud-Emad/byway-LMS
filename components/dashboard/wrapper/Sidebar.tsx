"use client";

import { useState } from "react";

import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarProfile from "./SidebarProfile";

export default function Sidebar({
  profile,
}: {
  profile: {
    username: string;
    avatar_url: string;
    role: string;
  };
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <aside className="bg-gray-900 text-slate-200 p-2 flex flex-col">
      <SidebarLogo isOpen={isOpen} setIsOpen={setIsOpen} />
      <SidebarNav role={profile.role} isOpen={isOpen} />
      <SidebarProfile
        username={profile.username}
        avatar_url={profile.avatar_url}
        isOpen={isOpen}
      />
    </aside>
  );
}
