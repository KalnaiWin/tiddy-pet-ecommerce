import { MenuIcon, User, XIcon } from "lucide-react";
import SelectorMenuBar from "./SelectorMenuBar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { logoutUser } from "../feature/userThunk";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ButtonMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="relative">
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
                  {currentUser?.imageProfile ? (
                    <img
                      src={`${currentUser.imageProfile}`}
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
  );
};

export default ButtonMenu;
