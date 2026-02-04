"use client";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
  type?: "button" | "submit" | "reset";
  clickedFun?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  classes = "bg-blue-700 transition-colors duration-150 hover:bg-blue-800 text-gray-50",
  type = "button",
  disabled = false,
  clickedFun,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      suppressHydrationWarning
      type={type}
      onClick={clickedFun}
      className={`capitalize px-4 py-1.5 rounded-sm font-semibold ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${classes}  `}
    >
      {children}
    </button>
  );
}
