import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { viewProductDetail } from "../../feature/productThunk";
import { StatusProduct } from "../../types/HelperFunction";
import { Dot } from "lucide-react";

interface Props {
  productId: string;
}

const ViewProductInformation = ({ productId }: Props) => {
  const { detail } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(viewProductDetail({ id: productId }));
  }, [dispatch, productId]);

  return (
    <>
      {detail ? (
        <div className="flex flex-col gap-3 p-5">
          <div className="flex justify-start">
            <div className="flex gap-2">
              <img
                src={detail.imageProduct[0] || `/src/asset/images/Empty.webp`}
                alt={detail._id}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
              />
              <div className="flex flex-col justify-around items-start">
                <h1 className="md:text-sm text-xl font-semibold text-orange-600">
                  {detail.name}
                </h1>
                <div
                  className={`${StatusProduct(
                    detail.status || "",
                  )} flex items-center rounded-md font-semibold text-xs w-fit px-2 py-0.5`}
                >
                  <Dot className="w-4 h-4" />
                  {detail.status}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 md:text-sm text-xs font-semibold text-slate-500">
              Description
            </h3>
            <p className="whitespace-pre-wrap md:text-sm text-xs text-slate-700">
              {detail.description}
            </p>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2">
            <h3 className="md:text-sm text-xs text-slate-400">Total</h3>
            <p className="md:text-sm text-xs font-medium">{detail.total}</p>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2">
            <h3 className="md:text-sm text-xs text-slate-400">Sold</h3>
            <p className="md:text-sm text-xs font-medium">{detail.sold}</p>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2">
            <h3 className="md:text-sm text-xs text-slate-400">Price</h3>
            <div className="md:text-sm text-xs font-medium">
              {detail?.minPrice ? (
                <p>
                  {" "}
                  {detail.minPrice}
                  {" - "}
                  {detail.maxPrice}{" "}
                </p>
              ) : (
                <p>{detail.maxPrice}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2 items-center">
            <h3 className="md:text-sm text-xs text-slate-400">Discount</h3>
            <p className="md:text-sm text-xs font-medium text-orange-700 bg-orange-100 px-5 py-0.5 rounded-md">
              {detail.discount}
            </p>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2">
            <h3 className="md:text-sm text-xs text-slate-400">Brand</h3>
            <p className="md:text-sm text-xs font-medium text-blue-500 underline">
              {detail.brand?.name}
            </p>
          </div>
          <div className="flex justify-between hover:bg-slate-50 py-1 px-2">
            <h3 className="md:text-sm text-xs text-slate-400">Category</h3>
            <div className="md:text-sm text-xs font-medium flex gap-2 text-red-500 ">
              {detail.category?.map((cate, idx) => (
                <div key={`${cate._id}+${idx}`} className="underline">
                  {cate.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="md:text-sm text-xs font-medium text-slate-500">
              Child Products
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {detail.childProduct?.map((child, idx) => (
                <div
                  key={`${child.name}-${idx}`}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50"
                >
                  {/* Image */}
                  <img
                    src={child.image}
                    alt={child.name}
                    className="h-12 w-12 rounded-md object-cover border"
                  />

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <span className="md:text-sm text-xs font-semibold text-slate-800">
                      {child.name}
                    </span>

                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>
                        Price: <b className="text-slate-700">{child.price}</b>
                      </span>
                      <span>
                        Stock: <b className="text-slate-700">{child.stock}</b>
                      </span>
                      <span>
                        Discount:{" "}
                        <b className="text-green-700">{child.discount}</b>
                      </span>
                      <span>
                        Status: <b className="text-slate-700">{child.status}</b>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Empty</div>
      )}
    </>
  );
};

export default ViewProductInformation;
