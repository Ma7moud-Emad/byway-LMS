import { IconType } from "react-icons";

export default function Outcomes_requirements_tags({
  title,
  icon: Icon,
  items,
  iconColor = "text-green-500",
  isFlex = false,
}: {
  title: string;
  icon?: IconType;
  items: string[];
  iconColor?: string;
  isFlex?: boolean;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>

      <ul
        className={`${
          isFlex ? "flex flex-wrap gap-4 items-center" : "space-y-4"
        }`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="text-sm flex items-center gap-2 text-gray-500"
          >
            {Icon && <Icon className={`${iconColor} text-xl`} />}
            {!Icon && "#"}
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
