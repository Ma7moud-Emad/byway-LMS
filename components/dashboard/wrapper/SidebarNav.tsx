"use client";

import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type NavItem = {
  label: string;
  href: string;
  Icon: IconType;
};

type SidebarNavProps = {
  role: string | undefined;
  isOpen: boolean;
};

import {
  FaHeart,
  FaCertificate,
  FaListAlt,
  FaPlusCircle,
  FaUserTie,
  FaCheckCircle,
  FaLayerGroup,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

const studentNav: NavItem[] = [
  {
    label: "dashboard",
    href: "dashboard",
    Icon: MdSpaceDashboard,
  },
  {
    label: "My Courses",
    href: "my-courses",
    Icon: FaListAlt,
  },
  { label: "Wishlist", href: "wishlist", Icon: FaHeart },
  { label: "Cart", href: "cart", Icon: FaShoppingCart },
  {
    label: "Certificates",
    href: "certificates",
    Icon: FaCertificate,
  },
  {
    label: "settings",
    href: "settings",
    Icon: IoSettingsSharp,
  },
];

const instructorNav: NavItem[] = [
  {
    label: "dashboard",
    href: "dashboard",
    Icon: MdSpaceDashboard,
  },
  {
    label: "My Courses",
    href: "courses",
    Icon: FaListAlt,
  },
  {
    label: "Create Course",
    href: "create",
    Icon: FaPlusCircle,
  },

  {
    label: "settings",
    href: "settings",
    Icon: IoSettingsSharp,
  },
];

const adminNav: NavItem[] = [
  {
    label: "Instructors",
    href: "/dashboard/admin/instructors",
    Icon: FaUserTie,
  },
  {
    label: "Approve Courses",
    href: "/dashboard/admin/courses",
    Icon: FaCheckCircle,
  },
  {
    label: "Categories & Programs",
    href: "/dashboard/admin/categories",
    Icon: FaLayerGroup,
  },
];

export default function SidebarNav({ role, isOpen }: SidebarNavProps) {
  const pathname = usePathname();

  const currentSegment = pathname.split("/").pop();

  const navItems =
    role === "student"
      ? studentNav
      : role === "instructor"
        ? instructorNav
        : adminNav;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    } else {
      window.location.replace("/");
    }
  };

  return (
    <ul className="mt-12 space-y-2">
      {navItems.map((item) => (
        <li
          key={item.label}
          className={`${
            currentSegment == item.href ? "bg-gray-700" : "bg-gray-800"
          } p-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300`}
        >
          <Link href={item.href} className="flex gap-2 items-center">
            <item.Icon />
            {isOpen && <p className="font-medium capitalize">{item.label}</p>}
          </Link>
        </li>
      ))}
      <li>
        <button
          suppressHydrationWarning
          className="flex gap-2 items-center p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors duration-300 w-full"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {isOpen && <p className="font-medium capitalize">log out</p>}
        </button>
      </li>
    </ul>
  );
}
