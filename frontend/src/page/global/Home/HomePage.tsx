import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProductHomePage from "./ProductHomePage";
import Footer from "./Footer";
import SkeletonHomePage from "../../../components/common/(customer)/SkeletonHomePage";
import adminSvg from "../../../asset/admin.svg";
import customerSvg from "../../../asset/customer.svg";
import shipperSvg from "../../../asset/shipper.svg";

export const HomePage = () => {
  const { currentUser, status } = useSelector((state: RootState) => state.user);

  if (status === "loading") return <SkeletonHomePage />;

  return (
    <div className="flex flex-col gap-10">
      <div className="relative overflow-hidden bg-slate-800">
        <div
          className="hidden md:block p-10 lg:text-3xl md:text-xl sm:text-md text-sm bg-orange-50"
          style={{
            clipPath: "polygon(0 0, 60% 0%, 45% 100%, 0% 100%)",
          }}
        >
          <h2 className="font-black flex gap-2">
            Hello,
            <span className="font-medium text-orange-500">
              {currentUser?.name || "Guest"}
            </span>
          </h2>
          <p className="font-black flex gap-2">
            Email:
            <span className="font-medium text-orange-500">
              {currentUser?.email || "guest@gmail.com"}
            </span>
          </p>
          {currentUser?.role === "SHIPPER" ? (
            <NavLink
              to={"/shipper"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Finding orders
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          ) : currentUser?.role === "ADMIN" ? (
            <NavLink
              to={"/admin/dashboard"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Check information
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          ) : (
            <NavLink
              to={"/store"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Explore Category Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          )}
        </div>
        <div className="block md:hidden p-3 lg:text-3xl md:text-xl sm:text-md text-sm bg-orange-50">
          <h2 className="font-black flex gap-2">
            Hello,
            <span className="font-medium text-orange-500">
              {currentUser?.name || "Guest"}
            </span>
          </h2>
          <p className="font-black flex gap-2">
            Email:
            <span className="font-medium text-orange-500">
              {currentUser?.email || "guest@gmail.com"}
            </span>
          </p>
          {currentUser?.role === "SHIPPER" ? (
            <NavLink
              to={"/shipper"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Finding orders
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          ) : currentUser?.role === "ADMIN" ? (
            <NavLink
              to={"/admin/dashboard"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Check information
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          ) : (
            <NavLink
              to={"/store"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Explore Category Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          )}
        </div>
        <div className="hidden md:block lg:block">
          {currentUser?.role === "SHIPPER" ? (
            <img
              src={shipperSvg}
              alt={currentUser.name}
              className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
            />
          ) : currentUser?.role === "ADMIN" ? (
            <img
              src={adminSvg}
              alt={currentUser.name}
              className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
            />
          ) : (
            <img
              src={customerSvg}
              alt={currentUser?.name || "Guest"}
              className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
            />
          )}
        </div>
      </div>
      {currentUser?.role !== "SHIPPER" && (
        <>
          <ProductHomePage />
          <Footer />
        </>
      )}
    </div>
  );
};
