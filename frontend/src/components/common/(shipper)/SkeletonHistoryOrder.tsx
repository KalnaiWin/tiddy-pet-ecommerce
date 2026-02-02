const SkeletonHistoryOrder = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm max-w-85 w-full animate-pulse">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-14 bg-gray-100 rounded"></div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="h-3 w-12 bg-gray-100 rounded"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>

        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <div className="h-3 bg-gray-100 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-4 bg-gray-100 h-10 rounded-lg"></div>

      <div className="p-4 border-t border-gray-100 pt-3">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <div className="h-3 w-20 bg-gray-100 rounded"></div>
        </div>
        <div className="h-3 w-full bg-gray-50 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonHistoryOrder;
