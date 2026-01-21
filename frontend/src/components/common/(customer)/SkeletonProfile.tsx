const SkeletonProfile = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-10 p-10 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="size-8 bg-slate-200 rounded-lg" />
          <div className="h-8 w-48 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-64 bg-slate-100 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-slate-100 rounded-full mb-4 ring-8 ring-white shadow-lg" />
            <div className="h-5 w-32 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-40 bg-slate-100 rounded mb-4" />

            <div className="flex gap-2 mb-6">
              <div className="h-4 w-16 bg-slate-100 rounded-full" />
              <div className="h-4 w-16 bg-slate-100 rounded-full" />
            </div>

            <div className="w-full pt-6 border-t border-gray-50 flex flex-col items-center">
              <div className="h-2 w-20 bg-slate-100 rounded mb-1" />
              <div className="h-5 w-32 bg-slate-200 rounded" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                  <div className="h-8 w-full bg-slate-50 border border-slate-100 rounded-xl" />
                </div>
              ))}
              <div className="space-y-3">
                <div className="h-3 w-32 bg-slate-100 rounded" />
                <div className="h-8 w-full bg-slate-50 border border-slate-100 rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-40 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
