const ProductDetailSkeleton = () => {
  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-3 w-2 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-2 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>

      <div className="bg-white rounded shadow-sm p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Left: Image skeleton */}
        <div className="md:col-span-5 space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded border bg-gray-200 w-full" />

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded bg-gray-200"
              />
            ))}
          </div>

          {/* Share & like */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <div className="w-6 h-6 rounded-full bg-gray-200" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-gray-200" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Right: Info skeleton */}
        <div className="md:col-span-7 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-4/5" />
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-8 bg-gray-200 rounded" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-px bg-gray-200" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Price box */}
          <div className="bg-gray-50 p-3 sm:p-4 flex flex-wrap items-center gap-3">
            <div className="h-8 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>

          <div className="space-y-5 text-sm">
            {/* Shipping */}
            <div className="flex items-start gap-3">
              <div className="w-24 sm:w-28 h-4 bg-gray-200 rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-56 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Variant buttons */}
            <div className="flex items-start gap-3">
              <div className="w-24 sm:w-28 h-4 bg-gray-200 rounded shrink-0 mt-1.5" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-24 sm:w-28 h-4 bg-gray-200 rounded shrink-0" />
              <div className="h-9 w-28 bg-gray-200 rounded-sm" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex-1 h-12 bg-gray-200 rounded-sm" />
              <div className="flex-1 h-12 bg-gray-200 rounded-sm" />
            </div>
          </div>

          {/* Guarantee */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm p-4 sm:p-6">
        <div className="bg-gray-50 p-4 -mx-4 sm:-mx-6 mb-6">
          <div className="h-5 w-48 bg-gray-200 rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
