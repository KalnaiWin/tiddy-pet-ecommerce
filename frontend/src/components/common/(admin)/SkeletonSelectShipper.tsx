const SkeletonSelectShipper = () => {
  return (
    <div className="flex justify-between gap-2 w-full my-2 bg-slate-100 animate-pulse p-1 rounded-md">
      <div className="flex gap-2 p-2">
        <div className="size-10 bg-slate-200 rounded-md" />
        <div className="flex flex-col gap-2">
          <p className="w-10 h-2 rounded-md bg-slate-200"></p>
          <p className="w-20 h-2 rounded-md bg-slate-200"></p>
        </div>
      </div>
      <div className="size-8 bg-slate-200 rounded-full animate-pulse" />
    </div>
  );
};

export default SkeletonSelectShipper;
