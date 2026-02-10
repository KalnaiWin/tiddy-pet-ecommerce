import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import { SocialNetwork } from "../../types/InterfaceProduct";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../feature/productThunk";
import { ProductInformation } from "../global/ProductInformation";
import SkeletonStore from "../../components/common/(customer)/SkeletonStore";

export const StorePage = () => {
  const { products, status } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(getAllProducts({ page, limit, name: debouncedName }));
  }, [page, limit, debouncedName, dispatch]);

  if (status === "loading") return <SkeletonStore />;

  return (
    <div className="w-full min-h-full">
      <div>
        {products?.length === 0 || !products ? (
          <div className="flex justify-center items-center min-h-screen">
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
          <div className="flex flex-col gap-2 md:p-10 p-4">
            <div className="relative w-full col-span-2">
              <input
                type="text"
                className="w-full indent-8 rounded-full p-1 bg-slate-200 focus:outline-none border"
                placeholder="Search email ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute md:top-1.5 top-1 left-2 size-5 text-slate-500" />
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-10">
              {products.map((product) => (
                <Link
                  to={`/store/${product._id}`}
                  key={product._id}
                  className=""
                >
                  <ProductInformation product={product} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-end h-full gap-2 mt-4 my-10 w-full">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">Page {page}</span>
        <button
          disabled={products?.length === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};
