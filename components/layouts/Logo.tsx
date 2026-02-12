"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} alt="logo" className="w-6" />
      <p className="text-xl text-gray-700 capitalize font-bold">byway</p>
    </Link>
  );
}
