export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin"></div>
      <p className="mt-4 text-sm text-gray-500">Loading data...</p>
    </div>
  );
}
