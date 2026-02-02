const SkeletonAvailableOrder = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm max-w-85 w-full animate-pulse">
      <div className="p-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-100 rounded"></div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-3 w-10 bg-gray-100 rounded"></div>
          </div>
        </div>

        <div className="w-full bg-gray-200 h-10 rounded-lg mb-6"></div>

        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
          </div>
          <div className="h-3 w-full bg-gray-50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonAvailableOrder;
