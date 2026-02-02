const SkeletonProfileShipper = () => {
  return (
    <div className="w-full px-10 py-10">
      {/* Title Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="animate-pulse w-6 h-6 rounded-md bg-orange-200" />
          <div className="bg-gray-200 animate-pulse w-40 h-8" />
        </div>
        <div className="bg-gray-200 animate-pulse w-80 h-4" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Card */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center">
            {/* Avatar Circle */}
            <div className="relative mb-6">
              <div className="bg-gray-200 animate-pulse w-32 h-32 rounded-full border-4 border-white shadow-sm" />
            </div>

            {/* User Info */}
            <div className="bg-gray-200 animate-pulse w-24 h-6 mb-2" />
            <div className="bg-gray-200 animate-pulse w-40 h-4 mb-6" />

            {/* Badges */}
            <div className="flex gap-2 mb-12">
              <div className="bg-gray-200 animate-pulse w-16 h-6 rounded-full" />
              <div className="bg-gray-200 animate-pulse w-16 h-6 rounded-full" />
              <div className="bg-gray-200 animate-pulse w-20 h-6 rounded-full" />
            </div>

            {/* Total Spend Divider */}
            <div className="w-full pt-6 border-t border-gray-50 flex flex-col items-center">
              <div className="bg-gray-200 animate-pulse w-24 h-3 mb-2" />
              <div className="bg-gray-200 animate-pulse w-32 h-6" />
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Full Name */}
              <div>
                <div className="bg-gray-200 animate-pulse w-24 h-3 mb-2" />
                <div className="bg-gray-200 animate-pulse w-full h-12 rounded-xl" />
              </div>
              {/* Email Address */}
              <div>
                <div className="bg-gray-200 animate-pulse w-28 h-3 mb-2" />
                <div className="bg-gray-200 animate-pulse w-full h-12 rounded-xl" />
              </div>
              {/* Phone Number */}
              <div>
                <div className="bg-gray-200 animate-pulse w-24 h-3 mb-2" />
                <div className="bg-gray-200 animate-pulse w-full h-12 rounded-xl" />
              </div>
              {/* Vehicle Type Selection */}
              <div>
                <div className="bg-gray-200 animate-pulse w-24 h-3 mb-2" />
                <div className="flex gap-2">
                  <div className="bg-gray-200 animate-pulse flex-1 h-12 rounded-xl" />
                  <div className="bg-gray-200 animate-pulse flex-1 h-12 rounded-xl" />
                  <div className="bg-gray-200 animate-pulse flex-1 h-12 rounded-xl" />
                </div>
              </div>
            </div>

            {/* License Plate */}
            <div className="mb-8">
              <div className="bg-gray-200 animate-pulse w-32 h-3 mb-2" />
              <div className="bg-gray-200 animate-pulse w-full h-12 rounded-xl" />
            </div>

            {/* Delivery Address */}
            <div className="mb-10">
              <div className="bg-gray-200 animate-pulse w-32 h-3 mb-2" />
              <div className="bg-gray-200 animate-pulse w-full h-32 rounded-xl" />
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end">
              <div className="animate-pulse w-40 h-12 rounded-xl bg-orange-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileShipper;
