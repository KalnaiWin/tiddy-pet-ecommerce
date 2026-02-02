const SkeletonProductManagement = () => {
  return (
    <tr className="animate-pulse">
      {/* Product Image & Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-md bg-slate-200" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3.5 w-[85%] bg-slate-200 rounded" />
            <div className="h-3.5 w-[60%] bg-slate-200 rounded" />
          </div>
        </div>
      </td>

      {/* Category & Brand */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-blue-100 rounded" />
          <div className="h-3 w-16 bg-rose-100 rounded" />
        </div>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <div className="h-7 w-24 bg-slate-100 rounded-md" />
      </td>

      {/* Inventory */}
      <td className="px-6 py-4">
        <div className="h-4 w-10 bg-slate-100 rounded" />
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-slate-100 rounded" />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-3">
          <div className="w-5 h-5 bg-slate-100 rounded" />
          <div className="w-5 h-5 bg-slate-100 rounded" />
          <div className="w-5 h-5 bg-slate-100 rounded" />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonProductManagement;
