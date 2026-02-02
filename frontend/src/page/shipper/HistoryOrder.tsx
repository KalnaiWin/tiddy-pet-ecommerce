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
import {
  Clock,
  MapPin,
  Phone,
  Package,
  Check,
  PackageIcon,
} from "lucide-react";
import { orderStatusShipping } from "../../types/InterfaceOrder";
import { Link } from "react-router-dom";
import SkeletonHistoryOrder from "../../components/common/(shipper)/SkeletonHistoryOrder";

const HistoryOrder = () => {
  const { availableOrder, availableStatus, changeStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [selectStatus, setSelectStatus] = useState("DELIVERED");

  useEffect(() => {
    dispatch(getAvailableOrderForShipper({ page, status: selectStatus }));
  }, [dispatch, page, selectStatus]);

  useEffect(() => {
    if (changeStatus === "succeeded") {
      dispatch(getAvailableOrderForShipper({ page, status: selectStatus }));
    }
  }, [changeStatus, dispatch, page, selectStatus]);
  const totalOrders = availableOrder.length;

  let earnings = 0;
  let totalOrderDelivered = 0;
  for (const order of availableOrder) {
    if (order.status === "DELIVERED") {
      totalOrderDelivered++;
      earnings += order.totalPrice * 0.15;
    }
  }

  return (
    <div className="px-10 py-5">
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">History Orders</h1>
          <p className="text-sm text-slate-600">
            Review your past deliveries and performance summary.
          </p>
        </div>
        {availableStatus === "loading" ? (
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-around items-center w-full max-w-lg animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded"></div>
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 w-1/2 p-2 border border-slate-500 rounded-md">
            <div className="flex flex-col items-center">
              <label className="uppercase text-xs font-bold text-slate-400">
                Total Orders
              </label>
              <p className="font-bold text-md">{totalOrders}</p>
            </div>
            <div className="flex flex-col items-center">
              <label className="uppercase text-xs font-bold text-slate-400">
                DELIVERED
              </label>
              <p className="font-bold text-md text-green-600">
                {totalOrderDelivered}
              </p>
            </div>
            <div className="flex flex-col items-center col-span-2">
              <label className="uppercase text-xs font-bold text-slate-400">
                Earnings
              </label>
              <p className="font-bold text-md text-orange-500">
                {formatVND(earnings)}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 bg-slate-200 w-fit p-1 rounded-md">
        {availableStatus === "loading" ? (
          <div className="w-24 h-4 bg-slate-100 animate-pulse" />
        ) : (
          <>
            {orderStatusShipping.map((status) => (
              <div
                key={status.value}
                className={`rounded-md text-center px-4 text-sm font-medium py-1 cursor-pointer transition
            ${
              selectStatus === status.value
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-100"
            }`}
                onClick={() => setSelectStatus(status.value)}
              >
                {status.name}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mt-5">
        {availableStatus === "loading" ? (
          <div className="grid xl:grid-cols-5 gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx}>
                <SkeletonHistoryOrder />
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
                      <div className="w-full bg-white border border-slate-700 rounded-xl flex flex-col text-sm">
                        <div className="flex flex-col w-full px-2 pt-2">
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
                          <div className="flex gap-2 items-center line-through">
                            <Clock className="size-5" />
                            <p className="font-extrabold text-orange-600">
                              {new Date(
                                order.predictedDayShipping,
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                        {order.status !== "DELIVERED" && (
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
                              : "Delivery"}
                          </button>
                        )}
                        <hr className="h-1 w-full text-slate-300" />
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
                        {order.status === "DELIVERED" && (
                          <div className="flex gap-2 text-sm mt-5 w-full bg-green-100 p-2 rounded-b-xl text-green-600 font-semibold uppercase">
                            <Check className="bg-green-600 text-green-100 rounded-full p-1 size-5" />
                            Successfully Delivered
                          </div>
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
                    You do not have any completed orders in history currently.
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

export default HistoryOrder;
