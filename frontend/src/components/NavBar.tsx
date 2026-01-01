import { Search, ShoppingCart, Store } from "lucide-react";
import ButtonAuth from "./ButtonAuth";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import ButtonMenu from "./ButtonMenu";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="p-5 w-full bg-white flex justify-between items-center relative">
      {/* Logo */}
      <Link to={"/"} className="flex items-center gap-2 cursor-pointer group">
        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white rotate-5 group-hover:rotate-15 transition-transform">
          <span className="text-2xl font-bold">TP</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
          Tiddy Pet
        </span>
      </Link>
      {/*  */}
      <div className="flex items-center gap-3 justify-end">
        {/* Search */}
        <div className="w-[70%] bg-slate-200 py-1.5 px-5 rounded-full relative">
          <Search className="absolute top-1.5 left-2 text-slate-400" />
          <input
            type="text"
            className=" w-full focus:outline-none indent-5"
            placeholder="Search..."
          />
        </div>
        <Link to={"/store"} className="md:block hidden">
          <Store />
        </Link>
        <button>
          <ShoppingCart />
        </button>
        {!currentUser ? <ButtonAuth /> : <ButtonMenu />}
      </div>
    </div>
  );
};

export default NavBar;
