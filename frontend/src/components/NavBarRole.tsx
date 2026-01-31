import { ArrowLeft, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { adminNavBarSelect } from "../types/InterfaceUser";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavBarRole = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-slate-800 text-white relative h-full flex md:block items-center w-full justify-between">
      <Link
        to={"/"}
        className="p-5 flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white rotate-5 group-hover:rotate-15 transition-transform">
          <span className="text-2xl font-bold">TP</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Tiddy Pet</span>
      </Link>
      <div
        className="md:hidden block px-5"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <Menu className="size-8" />
      </div>
      <div className="border-t border-b hidden md:flex flex-col h-[70%] justify-around p-5 ">
        {adminNavBarSelect.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex gap-2 items-center p-3 rounded-md transition-colors
      ${
        isActive
          ? "bg-orange-500 text-white font-bold"
          : "text-slate-300 hover:bg-slate-700"
      }`
            }
          >
            <item.icon />
            {item.name}
          </NavLink>
        ))}
      </div>
      <NavLink
        to={"/"}
        className="absolute bottom-0 w-full p-5 md:block hidden"
      >
        <div className="w-full flex gap-2 items-center text-slate-300 justify-center hover:bg-orange-50 hover:text-slate-700 p-3 font-bold rounded-md">
          <ArrowLeft />
          Return
        </div>
      </NavLink>

      {/* Mobile */}
      <div className="absolute block md:hidden bottom-0 w-full border-t border-slate-600">
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -top-1.5 left-0 bg-slate-800 w-full z-10 md:hidden"
              ref={menuRef}
            >
              <div className="flex flex-col gap-2 p-4">
                {adminNavBarSelect.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpenMenu(false)}
                    className={({ isActive }) =>
                      `flex gap-2 items-center p-3 rounded-md transition-colors
            ${
              isActive
                ? "bg-orange-500 text-white font-bold"
                : "text-slate-300 hover:bg-slate-700"
            }`
                    }
                  >
                    <item.icon />
                    {item.name}
                  </NavLink>
                ))}

                <NavLink to="/" onClick={() => setIsOpenMenu(false)}>
                  <div className="flex gap-2 items-center justify-center p-3 rounded-md text-slate-300 hover:bg-orange-50 hover:text-slate-700 font-bold">
                    <ArrowLeft />
                    Return
                  </div>
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBarRole;
