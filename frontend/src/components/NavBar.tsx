import { MenuIcon, Search, ShoppingCart } from "lucide-react";
import ButtonAuth from "./ButtonAuth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { logoutUser } from "../feature/userThunk";

const NavBar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-5 w-full bg-white flex justify-around items-center relative">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group w-1/2">
        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white rotate-5 group-hover:rotate-15 transition-transform">
          <span className="text-2xl font-bold">TP</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
          Tiddy Pet
        </span>
      </div>
      {/*  */}
      <div className="flex items-center gap-3 w-1/2 justify-end">
        {/* Search */}
        <div className="w-[30%] bg-slate-200 py-1.5 px-5 rounded-full relative">
          <Search className="absolute top-1.5 left-2 text-slate-400" />
          <input
            type="text"
            className=" w-full focus:outline-none indent-5"
            placeholder="Search..."
          />
        </div>
        <button>
          <ShoppingCart />
        </button>
        <div>
          <MenuIcon />
        </div>
        {!currentUser ? (
          <ButtonAuth />
        ) : (
          <button
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
