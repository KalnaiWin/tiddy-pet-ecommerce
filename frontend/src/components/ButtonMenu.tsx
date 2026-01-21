import { ChevronDown, LogOut, MenuIcon, User, XIcon } from "lucide-react";
import SelectorMenuBar from "./SelectorMenuBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { logoutUser } from "../feature/userThunk";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { roleUserColor } from "../types/HelperFunction";
import {
  adminNavBarSelect,
  customerNavbarSelect,
  shipperNavbarSelect,
} from "../types/InterfaceUser";

const ButtonMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-30">
      <div className="md:block hidden">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-all group outline-none"
          >
            <span className="text-xs font-bold text-orange-700 w-15">
              Hi, {currentUser?.name}
            </span>
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
              <User size={16} className="text-gray-600" />
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-20 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-sm font-bold text-gray-900">
                  {currentUser?.name}
                </p>
                <p className="text-[11px] text-gray-500">
                  {currentUser?.email}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${roleUserColor(
                      currentUser?.role as string,
                    )}`}
                  >
                    {currentUser?.role}
                  </span>
                </div>
              </div>

              <div className="px-2 space-y-1">
                {currentUser?.role === "ADMIN"
                  ? adminNavBarSelect.map((item) => (
                      <Link
                        to={item.path}
                        key={item.name}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                      >
                        <item.icon
                          size={18}
                          className="text-gray-400 group-hover:text-orange-500"
                        />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))
                  : currentUser?.role === "CUSTOMER"
                    ? customerNavbarSelect.map((item) => (
                        <Link
                          to={item.path}
                          key={item.name}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                        >
                          <item.icon
                            size={18}
                            className="text-gray-400 group-hover:text-orange-500"
                          />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))
                    : shipperNavbarSelect.map((item) => (
                        <Link
                          to={item.path}
                          key={item.name}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                        >
                          <item.icon
                            size={18}
                            className="text-gray-400 group-hover:text-orange-500"
                          />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-50 px-2">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                  onClick={() => dispatch(logoutUser())}
                >
                  <LogOut
                    size={18}
                    className="text-red-400 group-hover:text-red-600"
                  />
                  <span className="font-bold">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden block">
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setIsOpenMenu(true)}
        />

        <AnimatePresence>
          {isOpenMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsOpenMenu(false)}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-full max-w-md bg-white z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between mb-5 p-6 relative">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      TP
                    </div>
                    <span className="font-bold text-gray-900 text-2xl">
                      Tiddy Pet
                    </span>
                  </div>
                  <XIcon
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={() => setIsOpenMenu(false)}
                  />
                </div>

                <SelectorMenuBar />

                <div className="absolute left-0 px-6 md:bottom-5 bottom-0 w-full">
                  <div className="flex gap-2 items-center bg-slate-100 p-3 rounded-md relative">
                    {currentUser?.image_profile ? (
                      <img
                        src={`${currentUser?.image_profile}`}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="size-12 rounded-full border border-gray-400 p-2 text-gray-400 bg-white" />
                    )}

                    <div className="flex flex-col">
                      <p className="font-black">{currentUser?.name}</p>
                      <p className="text-slate-500 text-sm">
                        {currentUser?.email}
                      </p>
                    </div>
                    <Link
                      to={"/profile"}
                      className="absolute right-4 text-orange-600 font-bold cursor-pointer bg-white py-2 px-3 rounded-md hover:bg-orange-400 hover:text-white transition-all"
                    >
                      View
                    </Link>
                  </div>

                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="text-orange-600 font-black mt-5 w-full hover:bg-orange-100 transition-all py-4 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ButtonMenu;
