
const SkeletonOrderManagement = () => {
  return (
    <tr className="animate-pulse">
      {/* Order ID Skeleton */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-100 rounded" />
        </div>
      </td>

      {/* Customer Skeleton */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        </div>
      </td>

      {/* Total Skeleton */}
      <td className="px-6 py-5">
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </td>

      {/* Status Skeleton */}
      <td className="px-6 py-5">
        <div className="h-7 w-20 bg-slate-200 rounded-full" />
      </td>

      {/* Payment Skeleton */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-14 bg-slate-200 rounded-full" />
          <div className="h-3 w-10 bg-slate-200 rounded" />
        </div>
      </td>

      {/* Action Skeleton */}
      <td className="px-6 py-5">
        <div className="flex justify-end">
          <div className="h-9 w-24 bg-slate-200 rounded-md" />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonOrderManagement;
