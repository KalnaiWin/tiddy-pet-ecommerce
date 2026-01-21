export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-square bg-slate-200 rounded-xl animate-pulse" />
      <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
    </div>
  );
};

export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 mb-3 relative animate-pulse">
      <div className="absolute -top-3 -left-3 bg-slate-200 rounded-full size-12" />

      <div className="w-5 h-5 rounded bg-slate-200" />

      <div className="w-24 h-24 rounded-lg bg-slate-100" />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
      </div>

      <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
        <div className="h-6 bg-slate-200 rounded w-24" />

        <div className="flex items-center gap-4 w-full justify-between sm:justify-end">
          <div className="h-9 bg-slate-100 rounded-lg w-28" />
          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const SkeletonCart = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="h-10 bg-slate-200 rounded w-48 mb-8 animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="flex flex-col gap-6 bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-2/3 mb-2" />

            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="h-4 bg-slate-100 rounded w-20" />
                <div className="h-5 bg-slate-200 rounded w-24" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-slate-100 rounded w-20" />
                <div className="h-5 bg-slate-200 rounded w-24" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-slate-100 rounded w-20" />
                <div className="h-5 bg-slate-200 rounded w-16" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-28 uppercase tracking-widest" />
              <div className="flex gap-2">
                <div className="h-10 bg-slate-100 rounded-md flex-1" />
                <div className="h-10 bg-slate-100 rounded-md w-20" />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
              <div className="h-8 bg-slate-200 rounded w-24" />
              <div className="h-8 bg-slate-200 rounded w-32" />
            </div>

            <div className="h-16 bg-slate-200 rounded-md w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCart;
