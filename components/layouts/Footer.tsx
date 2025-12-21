"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";

import microsoft from "@/public/microsoft-icon.svg";

export default function Footer() {
  return (
    <footer className="tracking-wide bg-gray-800 text-gray-300 px-8 sm:px-12 pt-12 pb-6">
      <div className="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16">
        <div className="min-[1200px]:max-w-sm max-w-lg w-full">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="logo" />
            <p className="text-2xl text-gray-100 capitalize font-bold">byway</p>
          </Link>
          <div className="mt-6">
            <p className="leading-relaxed text-sm ">
              ReadymadeUI is a library of pre-designed UI components built for
              Tailwind CSS. It offers a collection of versatile and ready-to-use
              components.
            </p>
          </div>
        </div>

        <div className="min-[1200px]:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-100 font-semibold text-lg relative capitalize">
              get help
            </h4>

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-50 text-sm font-normal transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-100 font-semibold text-lg relative capitalize">
              Programs
            </h4>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  href="javascript:void(0)"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Art & Design
                </Link>
              </li>
              <li>
                <Link
                  href="javascript:void(0)"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="javascript:void(0)"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  IT & Software
                </Link>
              </li>

              <li>
                <Link
                  href="javascript:void(0)"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="javascript:void(0)"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Programming
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-100 font-semibold text-lg relative capitalize">
              Contact Us
            </h4>

            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  href="https://maps.app.goo.gl/3u9AXmAfnvSEuXTa6"
                  target="_blank"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Address: 123 Main St, Los Angeles
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+(123) 456-7890"
                  target="_blank"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Tel: +(123) 456-7890
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:bywayedu@webkul.in"
                  target="_blank"
                  className="hover:text-gray-100 text-sm font-normal"
                >
                  Mail: bywayedu@webkul.in
                </Link>
              </li>
              <li className="mt-4">
                <ul className="flex gap-2 items-center">
                  <li className="bg-gray-100 hover:bg-gray-300 transition-colors p-2 rounded-full cursor-pointer">
                    <FaFacebook className="text-2xl text-blue-600" />
                  </li>
                  <li className="bg-gray-100 hover:bg-gray-300 transition-colors p-2 rounded-full cursor-pointer">
                    <FiGithub className="text-2xl text-black" />
                  </li>
                  <li className="bg-gray-100 hover:bg-gray-300 transition-colors p-2 rounded-full cursor-pointer">
                    <FcGoogle className="text-2xl" />
                  </li>
                  <li className="bg-gray-100 hover:bg-gray-300 transition-colors p-2 rounded-full cursor-pointer">
                    <Image src={microsoft} alt="microsoft-logo" width={24} />
                  </li>
                  <li className="bg-gray-100 hover:bg-gray-300 transition-colors p-2 rounded-full cursor-pointer">
                    <FaXTwitter className="text-2xl text-black/80" />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
