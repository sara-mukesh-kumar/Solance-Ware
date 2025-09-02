export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-600 text-lg font-medium">Loading...</span>
    </div>
  );
}
