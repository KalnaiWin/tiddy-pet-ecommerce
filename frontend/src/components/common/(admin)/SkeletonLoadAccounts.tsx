const SkeletonLoadAccounts = () => {
  return (
    <tr className="animate-pulse">
      {/* Customer Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-24 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </td>

      {/* Total Spend */}
      <td className="px-6 py-4">
        <div className="h-4 w-28 bg-slate-100 rounded" />
      </td>

      {/* Created Date */}
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-slate-100 rounded" />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-3">
          <div className="w-5 h-5 bg-slate-100 rounded" />
          <div className="w-5 h-5 bg-slate-100 rounded" />
          <div className="w-5 h-5 bg-slate-100 rounded" />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonLoadAccounts;
