import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import {
  changeStatusOrder,
  getAvailableOrderForShipper,
} from "../../feature/orderThunk";
import { formatVND, generateOrderCode } from "../../types/HelperFunction";
import { Clock, MapPin, Truck, Phone, PackageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SkeletonOrderAssigned from "../../components/common/(shipper)/SkeletonOrderAssigned";
import { Link } from "react-router-dom";

const OrderAssigned = () => {
  const { availableOrder, availableStatus, changeStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [showInfoOrderId, setShowInfoOrderId] = useState<string | null>(null);

  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAvailableOrderForShipper({ page, status: "ASSIGNED" }));
  }, [dispatch, page]);

  console.log(availableOrder);

  useEffect(() => {
    if (changeStatus === "succeeded") {
      dispatch(getAvailableOrderForShipper({ page, status: "ASSIGNED" }));
    }
  }, [changeStatus, dispatch, page]);

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Assigned Orders</h1>
        <p className="text-sm text-slate-600">
          You have {availableOrder.length} deliveries to pick up
        </p>
      </div>
      <div className="mt-5">
        {availableStatus === "loading" ? (
          <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx}>
                <SkeletonOrderAssigned />
              </div>
            ))}
          </div>
        ) : (
          <>
            {availableOrder && availableOrder.length > 0 ? (
              <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {availableOrder.map((order) => {
                  return (
                    <div
                      key={order._id}
                      className="flex w-full rounded-xl border-2 border-slate-300"
                    >
                      <div className="w-2/5 rounded-l-xl">
                        <AnimatePresence mode="wait">
                          {showInfoOrderId === order._id ? (
                            <motion.div
                              key="info"
                              className="flex flex-col gap-2 text-slate-500 my-2 text-xs justify-center p-1 cursor-pointer"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -30 }}
                              transition={{ duration: 0.25 }}
                              onClick={() => setShowInfoOrderId(null)}
                            >
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
                            </motion.div>
                          ) : (
                            <motion.div
                              className="bg-slate-100 w-full h-full rounded-l-xl flex flex-col items-center justify-center px-2 cursor-pointer"
                              key="summary"
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -30 }}
                              transition={{ duration: 0.25 }}
                              onClick={() => setShowInfoOrderId(order._id)}
                            >
                              <Truck className="bg-purple-200 text-purple-600 p-1.5 rounded-full size-10" />
                              <p className="uppercase text-xs bg-indigo-100 text-indigo-700 rounded-md px-1 py-0.5 font-semibold mt-2 mb-5">
                                Assigned
                              </p>
                              <div className="relative w-full h-2 rounded-full bg-slate-200">
                                <div className="w-[50%] h-2 absolute top-0 left-0 bg-purple-800 rounded-l-full" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="w-3/5 bg-white border-slate-700 flex flex-col text-sm p-2 rounded-r-xl justify-between gap-2">
                        <div className="flex justify-between w-full items-center">
                          <p className="text-slate-700 text-xl font-bold">
                            {generateOrderCode(order._id, order.customerId)}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold">
                            {formatVND(order.totalPrice)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.items.length} item(s)
                          </p>
                        </div>
                        <button
                          className={`w-full rounded-md ${
                            loadingOrderId === order._id
                              ? "bg-orange-200 text-orange-700 cursor-not-allowed animate-pulse"
                              : "bg-orange-500 hover:bg-orange-400 cursor-pointer"
                          } text-white font-bold p-2 mb-4`}
                          disabled={loadingOrderId === order._id}
                          onClick={() => {
                            setLoadingOrderId(order._id);
                            dispatch(
                              changeStatusOrder({
                                status: "PICKING",
                                orderId: order._id,
                              }),
                            ).finally(() => {
                              setLoadingOrderId(null);
                            });
                          }}
                        >
                          {loadingOrderId === order._id
                            ? "Picking..."
                            : "Pick Up Order"}
                        </button>
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
                    You do not have any assigned orders currently.
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

export default OrderAssigned;
