import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";
import { getPreviousDataOfProduct } from "../../../feature/productThunk";

const TopPerformanceProduct = () => {
  const { analyticProduct } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPreviousDataOfProduct());
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-white rounded-md">
      <h1 className="p-4 font-black">Top Performance Product</h1>
      <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 uppercase w-60">
              Name
            </th>
            <th className="px-1 py-3 text-xs font-semibold text-slate-500 uppercase">
              Sold
            </th>
            <th className="px-1 py-3 text-xs font-semibold text-slate-500 uppercase">
              Revenue
            </th>
            <th className="px-1 py-3 text-xs font-semibold text-slate-500 uppercase">
              Stock
            </th>
            <th className="px-3 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {analyticProduct?.length > 0 ? (
            analyticProduct.map((product) => {
              const statusTotal = (product.currentTotal / product.total) * 100;
              const status =
                statusTotal >= 80 && statusTotal <= 100
                  ? "In stock"
                  : statusTotal >= 80 && statusTotal <= 100
                    ? "Low stock"
                    : "Out of stock";
              console.log(statusTotal);

              return (
                <tr
                  key={product._id}
                  className="hover:bg-slate-50 transition text-sm"
                >
                  <td className="px-3 pt-5 font-medium text-slate-700 line-clamp-1">
                    {product.name}
                  </td>
                  <td className="px-3 py-4 text-center text-slate-600">
                    {product.sold}
                  </td>
                  <td className="px-3 py-4 text-center font-bold">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${
                      status === "In stock"
                        ? "text-slate-600"
                        : status === "Low stock"
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {product.total}
                  </td>
                  <td className="text-end flex items-center justify-center">
                    <p
                      className={`px-2 py-1 text-xs font-medium rounded-full w-fit
                ${
                  status === "In stock"
                    ? "bg-green-200 text-green-600"
                    : status === "Low stock"
                      ? "bg-amber-200 text-amber-600"
                      : "bg-red-200 text-red-600"
                }`}
                    >
                      {status}
                    </p>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                No analytics data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformanceProduct;
