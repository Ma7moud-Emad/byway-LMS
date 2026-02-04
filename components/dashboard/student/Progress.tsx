export default function Progress({
  progress_percentage,
  progressColor = "text-gray-50",
}: {
  progress_percentage: number;
  progressColor?: string;
}) {
  return (
    <div className="my-4">
      <p className={`text-xl mb-2 ${progressColor && progressColor}`}>
        Progress: {progress_percentage}%
      </p>
      <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-3 bg-blue-700 rounded-full overflow-hidden"
          style={{ width: `${progress_percentage}%` }}
        />
      </div>
    </div>
  );
}
