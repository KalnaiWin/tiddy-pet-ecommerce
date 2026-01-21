import { Bell, ShoppingCart, Store } from "lucide-react";
import ButtonAuth from "./ButtonAuth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import ButtonMenu from "./ButtonMenu";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllItemsFromCart } from "../feature/cartThunk";

const NavBar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { cartArray } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllItemsFromCart());
  }, [dispatch]);

  return (
    <div className="p-5 w-full bg-white flex justify-between items-center relative">
      <Link to={"/"} className="flex items-center gap-2 cursor-pointer group">
        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white rotate-5 group-hover:rotate-15 transition-transform">
          <span className="text-2xl font-bold">TP</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
          Tiddy Pet
        </span>
      </Link>
      <div className="flex items-center gap-3 justify-end">
        <Link to={"/store"} className="md:block hidden hover:text-orange-600" title="Store">
          <Store />
        </Link>
        <button className="hover:text-orange-600">
          <Bell />
        </button>
        <Link to={"/cart"} className=" relative" title="Cart">
          <p className="absolute -top-2.5 -right-2 bg-orange-600 px-1.5 text-sm rounded-full text-white">
            {cartArray.length}
          </p>
          <ShoppingCart className="hover:text-orange-600 cursor-pointer" />
        </Link>
        {!currentUser ? <ButtonAuth /> : <ButtonMenu />}
      </div>
    </div>
  );
};

export default NavBar;
