import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound({
  heading,
  msg,
  href,
  btnText,
}: {
  heading: string;
  msg: string;
  href: string;
  btnText: string;
}) {
  return (
    <div className="text-center mt-50">
      <h3 className=" capitalize font-semibold text-xl text-gray-900">
        {heading}
      </h3>
      <p className=" text-gray-700 mb-4">{msg}</p>
      <Button>
        <Link href={href}>{btnText}</Link>
      </Button>
    </div>
  );
}
