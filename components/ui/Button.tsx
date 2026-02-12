"use client";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
  type?: "button" | "submit" | "reset";
  clickedFun?: () => void;
  disabled?: boolean;
  id?: string;
  padding?: string;
};

export default function Button({
  children,
  classes = "bg-gray-900 text-gray-50",
  type = "button",
  disabled = false,
  padding = "px-4 py-1.5",
  clickedFun,
  id,
}: ButtonProps) {
  return (
    <button
      id={id}
      disabled={disabled}
      suppressHydrationWarning
      type={type}
      onClick={clickedFun}
      className={`capitalize rounded-sm font-semibold ${padding} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${classes}  `}
    >
      {children}
    </button>
  );
}
