import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  if (!currentUser) return <p>Not logged in</p>;

  return (
    <div className="bg-slate-800">
      <div className="relative overflow-hidden">
        <div
          className="p-10 md:text-3xl text-xs bg-orange-50"
          style={{
            clipPath: "polygon(0 0, 60% 0%, 45% 100%, 0% 100%)",
          }}
        >
          <h2 className="font-black flex gap-2">
            Hello,
            <span className="font-medium text-orange-500">
              {currentUser.name}
            </span>
          </h2>
          <p className="font-black flex gap-2">
            Email:
            <span className="font-medium text-orange-500">
              {currentUser.email}
            </span>
          </p>
          {currentUser?.role === "CUSTOMER" ? (
            <NavLink
              to={"/store"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Explore Category Now
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
              to={"/shipper"}
              type="submit"
              className="bg-green-100 w-fit text-xs text-green-700 md:px-2 m:py-1 p-1.5 py-0.5 rounded-2xl font-bold shadow-lg hover:bg-green-700 hover:text-green-100 hover:-translate-y-0.5 transition-all flex items-center gap-1 mt-2 group cursor-pointer"
            >
              Finding orders
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          )}
        </div>
        {currentUser.role === "CUSTOMER" ? (
          <img
            src="src/asset/customer.svg"
            alt={currentUser.name}
            className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
          />
        ) : currentUser.role === "ADMIN" ? (
          <img
            src="src/asset/admin.svg"
            alt={currentUser.name}
            className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
          />
        ) : (
          <img
            src="src/asset/shipper.svg"
            alt={currentUser.name}
            className="absolute z-20 -right-1 md:-top-18 -top-11 md:size-90 size-60"
          />
        )}
      </div>
    </div>
  );
};
