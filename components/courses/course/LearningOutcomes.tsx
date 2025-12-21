import { FaCheck } from "react-icons/fa";

export default function LearningOutcomes({ items }: { items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">What you will learn</h2>

      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-white p-3 rounded-lg shadow text-sm flex items-center gap-2"
          >
            <FaCheck className="text-green-500" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
