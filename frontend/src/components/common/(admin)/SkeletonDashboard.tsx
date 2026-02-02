const SkeletonDashboard = () => {
  return (
    <div className="space-y-6 animate-pulse px-5">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm h-28 flex flex-col justify-between"
          >
            <div className="h-2 w-24 bg-slate-100 rounded" />
            <div className="flex items-center gap-3">
              <div className="h-6 w-32 bg-slate-100 rounded" />
              <div className="h-4 w-10 bg-slate-50 rounded" />
            </div>
            <div className="h-2 w-12 bg-slate-50 rounded" />
          </div>
        ))}
      </div>

      {/* Main Chart Skeleton */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div className="h-5 w-48 bg-slate-100 rounded mx-auto mb-8" />
        <div className="h-75 w-full bg-slate-50 rounded-lg flex items-end justify-around px-10 pb-10 gap-4">
          {[60, 40, 90, 30, 70, 45, 80, 50].map((h, i) => (
            <div
              key={i}
              className="w-10 bg-slate-100/50 rounded-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-6 px-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-2 w-8 bg-slate-50 rounded" />
          ))}
        </div>
      </div>

      {/* Distribution Widgets Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Widget Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-70">
          <div className="h-5 w-40 bg-slate-100 rounded mb-8" />
          <div className="flex items-center gap-8 px-4">
            <div className="w-36 h-36 rounded-full border-18 border-slate-50" />
            <div className="grid grid-cols-2 gap-4 flex-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-50" />
                    <div className="h-2.5 w-16 bg-slate-50 rounded" />
                  </div>
                  <div className="h-2.5 w-4 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Widget Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-70">
          <div className="h-5 w-52 bg-slate-100 rounded mx-auto mb-12" />
          <div className="flex items-end justify-around h-32 px-10 gap-6">
            {[80, 50, 20, 45, 35].map((h, i) => (
              <div
                key={i}
                className="w-full max-w-10 bg-slate-50 rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-around mt-4 px-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-2 w-12 bg-slate-50 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Table and List Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Product Performance Table Skeleton */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <div className="h-5 w-48 bg-slate-100 rounded" />
          </div>
          <div className="p-6 space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0"
              >
                <div className="h-3.5 w-[35%] bg-slate-100 rounded" />
                <div className="h-3.5 w-8 bg-slate-50 rounded" />
                <div className="h-4 w-20 bg-slate-100 rounded" />
                <div className="h-3.5 w-10 bg-slate-50 rounded" />
                <div className="h-6 w-16 bg-slate-50 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Customer List Skeleton */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <div className="h-5 w-36 bg-slate-100 rounded" />
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100" />
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-slate-100 rounded" />
                    <div className="h-2 w-32 bg-slate-50 rounded" />
                  </div>
                </div>
                <div className="h-3.5 w-16 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voucher Table Skeleton */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="h-5 w-44 bg-slate-100 rounded" />
        </div>
        <div className="p-10">
          <div className="grid grid-cols-6 gap-6 items-center border-b border-slate-50 pb-6">
            <div className="h-4 w-24 bg-slate-100 rounded" />
            <div className="h-5 w-16 bg-slate-100 rounded" />
            <div className="h-3 w-20 bg-slate-50 rounded" />
            <div className="h-3 w-20 bg-slate-50 rounded" />
            <div className="h-7 w-16 bg-slate-50 rounded-full mx-auto" />
            <div className="h-9 w-9 bg-slate-50 rounded-lg ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;
