"use client";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
  type?: "button" | "submit" | "reset";
  clickedFun?: () => void;
};

export default function Button({
  children,
  classes = "bg-gray-800 text-gray-50",
  type = "button",
  clickedFun,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={clickedFun}
      className={`capitalize px-4 py-1.5 rounded-lg font-semibold cursor-pointer ${classes} `}
    >
      {children}
    </button>
  );
}
