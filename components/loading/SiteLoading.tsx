export default function SiteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        <p className="text-sm text-blue-500">Loading...</p>
      </div>
    </div>
  );
}
