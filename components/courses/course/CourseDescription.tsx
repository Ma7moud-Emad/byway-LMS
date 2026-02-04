export default function CourseDescription({
  description,
}: {
  description: string;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        About this course
      </h2>
      <p className="text-gray-500 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
