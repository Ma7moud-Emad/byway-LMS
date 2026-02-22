"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

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
          <UL
            heading="Programs"
            lis={[
              { label: "Art & Design", href: "/" },
              { label: "Business", href: "/" },
              { label: "IT & Software", href: "/" },
              { label: "Programming", href: "/" },
              { label: "Languages", href: "/" },
            ]}
          />

          <UL
            heading="get help"
            lis={[
              { label: "Contact Us", href: "/contact" },
              { label: "Latest Articles", href: "/articles" },
              { label: "FAQ", href: "/faq" },
            ]}
          />

          <UL
            heading="Contact Us"
            lis={[
              {
                label: "Address: 123 Main St, Los Angeles",
                href: "https://maps.app.goo.gl/3u9AXmAfnvSEuXTa6",
                target: "_blank",
              },
              {
                label: "Tel: +(123) 456-7890",
                href: "tel:+(123) 456-7890",
                target: "_blank",
              },
              {
                label: "Mail: bywayedu@webkul.in",
                href: "mailto:bywayedu@webkul.in",
                target: "_blank",
              },
            ]}
            containerClasses="max-md:col-span-2"
          />
        </div>
      </div>
    </footer>
  );
}

function UL({
  lis,
  heading,
  containerClasses,
}: {
  lis: {
    href: string;
    label: string;
    target?: string;
  }[];
  heading: string;
  containerClasses?: string;
}) {
  return (
    <div className={`max-lg:min-w-[140px] ${containerClasses}`}>
      <h4 className="text-gray-100 font-semibold text-lg relative capitalize">
        {heading}
      </h4>
      <ul className="space-y-2 mt-4">
        {lis.map((item, ind) => {
          return (
            <li
              key={ind}
              className="relative w-fit pb-1 before:absolute before:bg-gray-100 before:h-px before:bottom-0 before:left-0 before:w-0 hover:before:w-full before:transition-all before:duration-200"
            >
              <Link
                href={item.href}
                target={item.target && item.target}
                className="hover:text-gray-100 text-sm font-normal transition-colors duration-150"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
