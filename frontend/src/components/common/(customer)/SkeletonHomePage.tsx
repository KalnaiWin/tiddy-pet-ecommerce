import { ArrowRight } from "lucide-react";
import SkeletonStore from "./SkeletonStore";
import { Link } from "react-router-dom";

export const BrandSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="size-10 bg-slate-200 rounded-full" />
      <div className="h-6 w-20 bg-slate-100 rounded" />
    </div>
  );
};

export const BrandsSectionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-10 border-y border-gray-100 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 container mx-auto w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <BrandSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

const SkeletonHomePage = () => {
  return (
    <>
      <div className="w-full relative overflow-hidden bg-slate-800">
        <div
          className="p-10 h-full bg-slate-100 flex flex-col gap-4 animate-pulse"
          style={{
            clipPath: "polygon(0 0, 60% 0%, 45% 100%, 0% 100%)",
          }}
        >
          <div className="flex gap-2 items-center">
            <div className="h-5 w-32 bg-slate-200 rounded" />
            <div className="h-5 w-32 bg-orange-200 rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-5 w-48 bg-slate-200 rounded" />
            <div className="h-5 w-48 bg-orange-200 rounded" />
          </div>
          <div className="h-5 w-50 bg-green-200 rounded-2xl" />
        </div>
        {/* Illustration placeholder */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-700/50 rounded-full animate-pulse hidden md:block" />
      </div>
      <h1 className="text-2xl font-black tracking-widest uppercase text-orange-600 flex justify-center p-10">
        Trusted by Top Brands
      </h1>
      <BrandsSectionSkeleton />
      <div className="flex justify-between items-center px-10">
        <div className="">
          <h1 className="text-3xl font-black">Featured Products</h1>
          <p className="text-slate-500 font-medium">
            Hand-picked bestsellers for your furry friends.
          </p>
        </div>
        <Link
          to={"/store"}
          className="flex items-center gap-2 text-orange-600 group"
        >
          <p className="text-md font-semibold underline">View all</p>{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-all delay-100 duration-100" />{" "}
        </Link>
      </div>
      <SkeletonStore />
      <div className="flex flex-col md:flex-row justify-between bg-slate-900 w-full p-10 gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center md:px-15 text-center gap-3 flex-1"
          >
            <div className="size-20 bg-white/10 rounded-2xl animate-pulse" />
            <div className="h-6 w-32 bg-slate-700 rounded animate-pulse" />
            <div className="space-y-2 w-full flex flex-col items-center">
              <div className="h-3 w-4/5 bg-slate-800 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-slate-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="mx-auto px-10 w-full flex flex-col md:flex-row justify-between items-center gap-6 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="bg-slate-200 p-2 rounded-md size-12 rotate-20" />
            <div className="h-8 w-32 bg-slate-200 rounded" />
          </div>

          <div className="h-4 w-64 bg-slate-100 rounded" />

          <div className="flex gap-6">
            <div className="h-4 w-12 bg-slate-100 rounded" />
            <div className="h-4 w-12 bg-slate-100 rounded" />
            <div className="h-4 w-12 bg-slate-100 rounded" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default SkeletonHomePage;
