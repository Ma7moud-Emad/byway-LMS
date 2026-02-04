import { IconType } from "react-icons";

type StatsProps = {
  icon: IconType;
  count: number;
  label: string;
  iconBgColor?: string;
  iconColor?: string;
};

export default function State({
  icon: Icon,
  count,
  label,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-500",
}: StatsProps) {
  return (
    <div className="bg-white flex gap-4 items-center justify-center py-8 rounded-sm shadow">
      <span className={`${iconBgColor} p-3 rounded-full`}>
        <Icon className={`text-3xl ${iconColor}`} />
      </span>
      <div className="text-center w-24">
        <h1 className="text-2xl font-bold text-gray-900">{count}</h1>
        <p className="capitalize text-gray-700 font-medium">{label}</p>
      </div>
    </div>
  );
}
