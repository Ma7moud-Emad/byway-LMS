"use client";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

export default function Spinner({
  size = "md",
  color = "text-white",
}: SpinnerProps) {
  const sizeClass =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-12 h-12" : "w-6 h-6";

  return (
    <div
      className={`inline-block ${sizeClass} border-4 border-t-transparent border-b-transparent rounded-full animate-spin ${color}`}
    />
  );
}
