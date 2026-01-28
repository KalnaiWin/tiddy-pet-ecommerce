export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-square bg-slate-200 rounded-xl animate-pulse" />
      <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
    </div>
  );
};

const SkeletonStore = () => {
  return (
    <div className="w-full min-h-full p-10">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10">
        <div className="w-16 h-8 bg-slate-200 rounded animate-pulse" />
        <div className="w-20 h-6 bg-slate-200 rounded animate-pulse" />
        <div className="w-16 h-8 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonStore;
