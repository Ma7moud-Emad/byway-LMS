import { FaQuoteLeft } from "react-icons/fa";
import image from "@/public/signup.svg";
import Image from "next/image";

export default function CustomerCard() {
  return (
    <div className="rounded-2xl shadow-blue-light p-4 border-2 border-gray-100 space-y-2 bg-white">
      <FaQuoteLeft className="text-2xl text-blue-500 ml-2 mb-2" />
      <h2 className="font-normal text-gray-700">
        Byway&lsquo;s tech courses are top-notch! As someone who&lsquo;s always
        looking to stay ahead in the rapidly evolving tech world, I appreciate
        the up-to-date content and engaging multimedia.
      </h2>
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 overflow-hidden rounded-full ">
          <Image src={image} alt="image" className="object-cover" />
        </div>
        <p className="capitalize text-gray-900 font-medium">mahmoud</p>
      </div>
    </div>
  );
}
