import Image from "next/image";
import Link from "next/link";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import logo from "@/public/logo.svg";

export default function SidebarLogo({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) {
  return (
    <div className={`flex ${isOpen ? "justify-between" : "justify-center"}`}>
      {isOpen && (
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={25} className=" object-contain" />
          <p className="font-bold ">Byway</p>
        </Link>
      )}
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-1 rounded-sm bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
      >
        {isOpen ? (
          <LuArrowLeftToLine className="text-2xl" />
        ) : (
          <LuArrowRightToLine className="text-2xl" />
        )}
        <span className="sr-only">open or close menu</span>
      </button>
    </div>
  );
}
