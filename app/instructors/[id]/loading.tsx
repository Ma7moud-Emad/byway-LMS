export default function Loading() {
  return (
    <section className="animate-pulse">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 border-b-2 border-b-gray-300 pb-4">
          <div className="h-[100px] w-[100px] rounded-full bg-gray-200" />

          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 grid grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="px-6">
        <div className="h-6 w-1/4 bg-gray-300 rounded mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCourseCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
function SkeletonCourseCard() {
  return (
    <div className="rounded-xl p-3 space-y-3 animate-pulse">
      <div className="h-40 w-full bg-gray-200 rounded-lg" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="flex justify-between">
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
