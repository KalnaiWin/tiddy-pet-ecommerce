import { Link } from "react-router-dom";
import { brandSupport } from "../../../types/InterfaceGlobal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";
import { ProductInformation } from "../../../components/ProductInformation";
import { getAllProducts } from "../../../feature/productThunk";
import { SocialNetwork } from "../../../types/InterfaceProduct";
import { ArrowRight, PackageSearch } from "lucide-react";

const ProductHomePage = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10, name: "" }));
  }, []);

  return (
    <div className="px-10 w-full flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-black tracking-widest uppercase text-orange-600">
          Trusted by Top Brands
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {brandSupport.map((brand) => (
            <Link
              key={brand.name}
              to={brand.path}
              className="group flex flex-col md:flex-row items-center gap-2 md:gap-3"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="size-14 md:size-20 grayscale transition-all duration-200 group-hover:grayscale-0"
              />

              <p className="text-sm md:text-lg font-semibold text-slate-600 text-center md:text-left">
                {brand.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-3xl font-black">Featured Products</h1>
            <p className="text-slate-500 font-medium">
              Hand-picked bestsellers for your furry friends.
            </p>
          </div>
          <Link
            to={"/store"}
            className="flex items-center gap-2 text-orange-600 group"
          >
            <p className="text-md font-semibold underline">View all</p>{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all delay-100 duration-100" />{" "}
          </Link>
        </div>
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
          <div className="flex flex-col gap-2">
            <div className="grid md:grid-cols-5 grid-cols-2 gap-5 mt-10">
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
    </div>
  );
};

export default ProductHomePage;
