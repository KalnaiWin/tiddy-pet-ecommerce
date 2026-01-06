import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getAllProducts } from "../feature/productThunk";
import { PackageSearch } from "lucide-react";
import { SocialNetwork } from "../types/InterfaceProduct";
import { Link } from "react-router-dom";

export const StorePage = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(0);


  // useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [dispatch]);

  return (
    <div className="w-full min-h-full">
      <div>
        {products?.length === 0 || !products ? (
          <div className="absolute-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <PackageSearch className="size-40 p-5 text-orange-500 bg-orange-100 rounded-full mb-5" />
              <h1 className="text-4xl font-bold">Our shelves are resting</h1>
              <p className="text-center px-30">
                We are currently restocking our digital shelves with the best
                treats and toys. Our curators are working hard to bring you
                something special!
              </p>
              <Link
                to={"/"}
                className="font-bold px-5 py-2 bg-orange-500 rounded-md text-slate-50 hover:opacity-80"
              >
                Check back later
              </Link>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 mt-5">
                CONNECT WITH SHOP
              </p>
              <div className="flex gap-5">
                {SocialNetwork.map((social) => (
                  <Link
                    to={social.link}
                    key={social.name}
                    className="bg-slate-100 px-5 py-3 text-md rounded-md border-2 border-transparent transition-all hover:border-orange-600 hover:text-orange-600 duration-100"
                  >
                    <p>{social.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 grid-cols-2">
            <div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
