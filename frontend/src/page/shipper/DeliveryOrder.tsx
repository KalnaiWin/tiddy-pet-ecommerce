import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import {
  changeStatusOrder,
  getAvailableOrderForShipper,
} from "../../feature/orderThunk";
import {
  formatVND,
  generateOrderCode,
  statusOrderColor,
} from "../../types/HelperFunction";
import { Clock, MapPin, Phone, Package, PackageIcon } from "lucide-react";
import SkeletonDeliveryOrder from "../../components/common/(shipper)/SkeletonDeliveryOrder";
import { Link } from "react-router-dom";

const DeliveryOrder = () => {
  const { availableOrder, availableStatus, changeStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAvailableOrderForShipper({ page, status: "SHIPPING" }));
  }, [dispatch, page]);

  useEffect(() => {
    if (changeStatus === "succeeded") {
      dispatch(getAvailableOrderForShipper({ page, status: "SHIPPING" }));
    }
  }, [changeStatus, dispatch, page]);

  return (
    <div className="px-10 py-5">
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Delivering Orders</h1>
          <p className="text-sm text-slate-600">
            Review your past deliveries and performance summary.
          </p>
        </div>
      </div>
      <div className="mt-5">
        {availableStatus === "loading" ? (
          <div className="grid xl:grid-cols-5 gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx}>
                <SkeletonDeliveryOrder />
              </div>
            ))}
          </div>
        ) : (
          <>
            {availableOrder && availableOrder.length > 0 ? (
              <div className="grid xl:grid-cols-5 gap-2">
                {availableOrder.map((order) => {
                  return (
                    <div key={order._id}>
                      <div className="w-full bg-white border border-slate-700 rounded-xl flex flex-col text-sm p-2">
                        <div className="flex flex-col w-full px-2">
                          <div className="flex gap-2 items-center">
                            <p className="font-semibold text-slate-700">
                              {generateOrderCode(order._id, order.customerId)}
                            </p>
                            <p
                              className={`uppercase text-xs rounded-md px-1 py-0.5 font-semibold ${statusOrderColor(order.status)}`}
                            >
                              {order.status}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <p className="text-xs text-slate-500">
                              {order.items.length} item(s)
                            </p>
                            {" • "}
                            <p className="flex items-center gap-2">
                              Total:
                              <p className="font-bold text-orange-600">
                                {formatVND(order.totalPrice)}
                              </p>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 text-slate-500 my-2 text-xs px-2">
                          <div className="flex gap-2 items-center">
                            <MapPin className="size-5" />
                            <p className="font-semibold">
                              {order.shipping.address}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Phone className="size-5" />
                            <p className="font-semibold">
                              {order.shipping.phone}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Clock className="size-5" />
                            <p className="font-extrabold text-orange-600">
                              {new Date(
                                order.predictedDayShipping,
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                        <button
                          className={`w-full rounded-md px-2 ${
                            loadingOrderId === order._id
                              ? "bg-orange-200 text-orange-700 cursor-not-allowed animate-pulse"
                              : "bg-orange-500 hover:bg-orange-400 cursor-pointer"
                          } text-white font-bold p-2`}
                          disabled={loadingOrderId === order._id}
                          onClick={() => {
                            setLoadingOrderId(order._id);
                            dispatch(
                              changeStatusOrder({
                                status: "DELIVERED",
                                orderId: order._id,
                              }),
                            ).finally(() => {
                              setLoadingOrderId(null);
                            });
                          }}
                        >
                          {loadingOrderId === order._id
                            ? "Loading..."
                            : "Check complete"}
                        </button>
                        <div className="flex items-center gap-2 text-slate-500 mt-2 px-2">
                          <Package className="size-5" />
                          <p className="uppercase text-xs font-semibold">
                            Order Items
                          </p>
                        </div>
                        {order.items && order.items.length > 0 ? (
                          <div className="flex flex-col gap-2 text-xs px-2">
                            {order.items.map((item) => (
                              <p
                                key={item.productName}
                                className="text-slate-600 font-medium line-clamp-1"
                              >
                                x{item.quantity} {item.productName}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <div>Empty</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <PackageIcon className="rounded-full size-30 bg-yellow-200 text-yellow-700 p-2" />
                  <div className="font-black text-xl text-slate-700 mt-5">
                    You do not have any delivering orders currently.
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    Check again later or refresh page
                  </p>
                  <Link
                    to={"/"}
                    className="bg-orange-100 text-orange-600 font-bold px-10 py-2 rounded-md mt-5 cursor-pointer"
                  >
                    Home
                  </Link>
                </div>
              </div>
            )}
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

export default DeliveryOrder;
