const SkeletonOrderAssigned = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-1 flex shadow-sm animate-pulse max-w-md w-full">
      {/* Left Icon Section Skeleton */}
      <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center min-w-25 border-r border-gray-100">
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-3 w-12 bg-gray-200 rounded-full mb-3"></div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full"></div>
      </div>

      {/* Right Content Section Skeleton */}
      <div className="flex-1 p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="flex items-baseline space-x-2">
            <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded-md w-1/4"></div>
          </div>
        </div>

        <div className="w-full bg-gray-200 h-12 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SkeletonOrderAssigned;
