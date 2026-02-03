import {
  Dot,
  Edit,
  PlusCircle,
  Search,
  Trash,
  View,
  XIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../feature/productThunk";
import { StatusProduct } from "../../types/HelperFunction";
import toast from "react-hot-toast";
import { resetProductCRUDstatus } from "../../store/productSlice";
import ViewProductInformation from "./ViewProductInformation";
import SkeletonProductManagement from "../../components/common/(admin)/SkeletonProductManagement";

const ProductStore = () => {
  const { products, deletingStaus, creatingStatus, editStatus, status } =
    useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  const [isView, setIsView] = useState({
    option: false,
    productId: "",
  });

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

  useEffect(() => {
    if (creatingStatus === "succeeded") {
      toast.success("Created successfully!");
      dispatch(getAllProducts({ page, limit, name: debouncedName }));
      dispatch(resetProductCRUDstatus());
    }
  }, [creatingStatus, dispatch, page, limit, debouncedName]);

  useEffect(() => {
    if (editStatus === "succeeded") {
      toast.success("Updated successfully!");
      dispatch(getAllProducts({ page, limit, name: debouncedName }));
      dispatch(resetProductCRUDstatus());
    }
    if (editStatus === "failed") {
      toast.error("Update failed");
      dispatch(resetProductCRUDstatus());
    }
  }, [editStatus, dispatch, page, limit, debouncedName]);

  useEffect(() => {
    if (deletingStaus === "succeeded") {
      toast.success("Deleted successfully");
      dispatch(getAllProducts({ page, limit, name: debouncedName }));
      dispatch(resetProductCRUDstatus());
    }
    if (deletingStaus === "failed") {
      toast.error("Delete failed");
      dispatch(resetProductCRUDstatus());
    }
  }, [deletingStaus, dispatch, page, limit, debouncedName]);

  let totalSold = 0;
  products?.forEach((product) => {
    totalSold += product.sold;
  });

  return (
    <div className="w-full min-h-screen bg-slate-100 relative">
      {isView.option && (
        <div
          className="absolute w-full h-full bg-black/70 z-2 flex justify-center items-center"
          onClick={() => setIsView({ option: false, productId: "" })}
        >
          <div
            className="absolute top-5 xl:w-[70%] xl:h-[80%] w-[80%] h-[60%] bg-white rounded-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsView({ option: false, productId: "" })}
              className="absolute right-3 top-3 z-30 rounded-full bg-white p-1 text-slate-500 hover:bg-red-100 hover:text-red-600"
              aria-label="Close"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <ViewProductInformation productId={isView.productId} />
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 px-5">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
            Inventory Management
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            Manage your product catalog, pricing and stock levels.
          </p>
        </div>
        <div className="md:hidden grid md:grid-cols-3 grid-cols-2 w-full my-2 md:p-3 rounded-md gap-1 md:text-xl text-xs">
          <div className="flex flex-col gap-1 bg-white items-center justify-center py-1 rounded-md">
            <p className="tracking-widest text-slate-500 font-semibold">
              TOTAL
            </p>
            <p className="font-bold">{products?.length || 0}</p>
          </div>
          <div className="flex flex-col gap-1 bg-white items-center justify-center py-1 rounded-md">
            <p className="tracking-widest text-slate-500 font-semibold">SOLD</p>
            <p className="font-bold">{totalSold}</p>
          </div>
        </div>
        <Link
          to={"/admin/create"}
          className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-semibold rounded-md hover:bg-orange-600 transition-all duration-200 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Product
        </Link>
      </div>

      <div className="md:grid hidden md:grid-cols-3 grid-cols-2 w-full my-2 md:p-3 rounded-md gap-1 md:text-xl text-xs">
        <div className="flex flex-col gap-1 bg-white items-center justify-center py-1 rounded-md">
          <p className="tracking-widest text-slate-500 font-semibold">TOTAL</p>
          <p className="font-bold">{products?.length || 0}</p>
        </div>
        <div className="flex flex-col gap-1 bg-white items-center justify-center py-1 rounded-md">
          <p className="tracking-widest text-slate-500 font-semibold">SOLD</p>
          <p className="font-bold">{totalSold}</p>
        </div>
      </div>

      <div className="p-3 sm:p-5 bg-white rounded-xl sm:rounded-2xl">
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full indent-10 py-1.5 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 border text-sm sm:text-base border-slate-300"
            placeholder="Search product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-1.5 left-2 sm:w-5 sm:h-5 text-slate-400" />
        </div>

        {products?.length === 0 || products === null ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-slate-400 mb-4">
              <Search className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              No products found
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <>
            <div className="hidden xl:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category & Brand
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Inventory
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {status === "loading"
                    ? Array.from({ length: 6 }).map((_, idx) => (
                        <SkeletonProductManagement key={`skeleton-${idx}`} />
                      ))
                    : products.map((product, idx) => (
                        <tr
                          key={`${product._id}+${idx}`}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex gap-3 items-center">
                              <img
                                src={`${product.imageProduct[0]}`}
                                alt={product.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <p className="text-sm font-semibold">
                                {product.name}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex md:flex-row flex-col gap-4">
                              <div className="flex flex-wrap gap-1">
                                {product.category?.length > 0 &&
                                  product.category?.map((cate, idx) => (
                                    <span
                                      key={`${cate._id}+${idx}`}
                                      className="text-xs font-medium text-blue-700 underline"
                                    >
                                      {cate.name}
                                    </span>
                                  ))}
                              </div>
                              <span className="text-xs font-medium text-pink-700 underline">
                                {product.brand?.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div
                              className={`${StatusProduct(
                                product.status || "",
                              )} flex items-center rounded-md font-semibold text-xs w-fit px-2 py-1`}
                            >
                              <Dot className="w-5 h-5" />
                              {product.status}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-lg font-medium">
                            {product.total}
                          </td>
                          <td className="px-4 py-3">
                            {product.minPrice !== 0 ? (
                              <div className="flex gap-1 text-sm font-medium">
                                <span>{product.minPrice}</span>
                                <span>-</span>
                                <span>{product.maxPrice}</span>
                              </div>
                            ) : (
                              <div className="text-sm font-medium">
                                {product.maxPrice}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <button
                                onClick={() => {
                                  setIsView({
                                    option: true,
                                    productId: product._id,
                                  });
                                }}
                                className="text-slate-600 hover:bg-slate-200 p-1.5 rounded-md transition-colors"
                              >
                                <View className="w-4 h-4" />
                              </button>
                              <Link
                                to={`/admin/edit/${product._id}`}
                                className="text-blue-600 hover:bg-blue-200 p-1.5 rounded-md transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() =>
                                  dispatch(deleteProduct({ id: product._id }))
                                }
                                className={`p-1.5 rounded-md transition-colors ${
                                  deletingStaus === "loading"
                                    ? "text-red-300 cursor-not-allowed"
                                    : "text-red-600 hover:bg-red-200"
                                }`}
                                disabled={deletingStaus === "loading"}
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Mobile responsive */}
            <div className="block xl:hidden space-y-3 sm:space-y-4">
              {products.map((product, idx) => (
                <div
                  key={`${product._id} + ${idx}`}
                  className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between gap-3 mb-3">
                    <div className="flex gap-3">
                      <img
                        src={product.imageProduct[0] || "/src/asset/images/Empty.webp"}
                        alt={product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base mb-1">
                          {product.name}
                        </h3>
                        <div
                          className={`${StatusProduct(
                            product.status || "",
                          )} flex items-center rounded-md font-semibold text-xs w-fit px-2 py-0.5`}
                        >
                          <Dot className="w-4 h-4" />
                          {product.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Product Details */}
                  <div className="space-y-2 text-xs sm:text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Category:</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {product.category?.length > 0 &&
                          product.category?.map((cate, idx) => (
                            <span
                              key={`${cate._id}+${idx}`}
                              className="font-medium text-blue-700 underline"
                            >
                              {cate.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Brand:</span>
                      <span className="font-medium text-pink-700 underline">
                        {product.brand?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Inventory:</span>
                      <span className="font-semibold">{product.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Price:</span>
                      <span className="font-semibold">
                        {product.minPrice
                          ? `${product.minPrice} - ${product.maxPrice}`
                          : product.maxPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:justify-end justify-start gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsView({
                          option: true,
                          productId: product._id,
                        });
                      }}
                      className="text-slate-600 hover:bg-slate-200 p-2 rounded-md transition-colors"
                    >
                      <View className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <Link
                      to={`/admin/edit/${product._id}`}
                      className="text-blue-600 hover:bg-blue-200 p-2 rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                    <button
                      onClick={() =>
                        dispatch(deleteProduct({ id: product._id }))
                      }
                      className={` p-2 rounded-md transition-colors ${
                        deletingStaus === "loading"
                          ? "cursor-not-allowed text-red-300"
                          : "text-red-600 hover:bg-red-200"
                      }`}
                      disabled={deletingStaus === "loading"}
                    >
                      <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-300 rounded-md text-xs sm:text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>

        <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-300 rounded-md text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductStore;
