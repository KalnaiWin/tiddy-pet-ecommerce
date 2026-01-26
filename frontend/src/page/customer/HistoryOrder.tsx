import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Calendar,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../feature/orderThunk";
import {
  formatVND,
  generateOrderCode,
  paymentStatusColor,
  statusOrderColor,
} from "../../types/HelperFunction";
import { PaymentStatusOrder, StatusOrder } from "../../types/InterfaceOrder";
import { Link } from "react-router-dom";

const HistoryOrder = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch<AppDispatch>();

  const [isExpanded, setIsExpanded] = useState<string | null>(null);

  const handleToggle = (idx: string) => {
    setIsExpanded((prev) => (prev === idx ? null : idx));
  };

  const [page, setPage] = useState(1);
  const limit = 10;

  const [filter, setFilter] = useState({
    search: "",
    status: "",
    payment: "",
  });

  useEffect(() => {
    dispatch(
      getAllOrders({
        page,
        limit,
        search: filter.search,
        status: filter.status,
        payment: filter.payment,
      }),
    );
  }, [dispatch, page, limit, filter.search, filter.status, filter.payment]);

  console.log(orders);

  return (
    <div className="p-10">
      <div className="md:flex sm:flex-1 flex-1 flex-col justify-between w-full mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 w-1/2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              Order History
            </h1>
            <p className="text-gray-500 mt-1">
              Check the status of recent orders and manage your returns.
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-10 gap-2 md:w-1/2 w-full">
          <div className="flex gap-5 items-center">
            <h1 className="uppercase text-xs font-medium tracking-widest">
              Payment:
            </h1>
            <div className="flex gap-2">
              {PaymentStatusOrder.map((payment) => {
                const isActive =
                  filter.payment.toUpperCase() === payment.name.toUpperCase();
                return (
                  <div
                    key={payment.name}
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        payment:
                          payment.name.toUpperCase() === "ALL"
                            ? ""
                            : payment.name.toUpperCase(),
                      }))
                    }
                    className={`px-2 py-0.5 rounded-md text-xs font-medium transition cursor-pointer
                      ${
                        isActive
                          ? paymentStatusColor(payment.name.toUpperCase())
                          : !filter.payment &&
                              payment.name.toUpperCase() === "ALL"
                            ? "bg-orange-200 text-orange-700"
                            : `bg-slate-300 text-slate-900 hover:opacity-80`
                      }
                      }`}
                  >
                    {payment.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-5 w-full items-center">
            <h1 className="uppercase text-xs font-medium tracking-widest">
              Status:
            </h1>
            <div className="md:flex grid grid-cols-5 gap-1 w-full">
              {StatusOrder.map((status) => {
                const isActive =
                  filter.status.toUpperCase() === status.name.toUpperCase();
                return (
                  <div
                    key={status.name}
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        status:
                          status.name.toUpperCase() === "ALL"
                            ? ""
                            : status.name.toUpperCase(),
                      }))
                    }
                    className={`px-2 py-0.5 rounded-md text-xs font-medium transition cursor-pointer
                      ${
                        isActive
                          ? statusOrderColor(status.name.toUpperCase())
                          : !filter.status &&
                              status.name.toUpperCase() === "ALL"
                            ? "bg-orange-200 text-orange-700"
                            : "bg-slate-300 text-slate-900"
                      }
                    `}
                  >
                    {status.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow my-5"
          >
            {/* Header Info */}
            <div className="p-4 sm:p-6 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 bg-slate-50/50">
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Order ID
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {generateOrderCode(order._id, order.user._id)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Date Placed
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatVND(order.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Status
                  </p>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${statusOrderColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Payment
                  </p>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${paymentStatusColor(order.payment.status.toUpperCase())}`}
                  >
                    {order.payment.status}
                  </span>
                </div>
                <button
                  onClick={() => handleToggle(order._id)}
                  className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  {isExpanded === order._id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {isExpanded === order._id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 overflow-hidden">
                  {order.items &&
                    order.items.map((item, idx) => (
                      <img
                        key={`${item?.variant?._id}+${idx}`}
                        src={item?.variant?.image || "/src/asset/Empty.webp"}
                        alt={item?.variant?.name}
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white object-cover bg-gray-100"
                      />
                    ))}
                  {order.items.length > 3 && (
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg ring-2 ring-white bg-gray-200 text-xs font-bold text-gray-600">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-900">
                    {`${order.items.length} items`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Track package for status updates
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${order.payment.status === "UNPAID" ? "text-red-800 bg-red-300" : "text-green-800 bg-green-300"}`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  {order.payment.status === "UNPAID" ? (
                    <p>Unpaid</p>
                  ) : (
                    <p>Paid via {order.payment.method}</p>
                  )}
                </div>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  Track Order
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {isExpanded === order._id && (
              <div className="px-4 sm:px-6 pb-6 pt-2 animate-in fade-in duration-300">
                <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    Item Breakdown
                  </h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${item.productId}+${idx}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.variant?.image || "/src/asset/Empty.webp"}
                            alt={item.variant?.name || ""}
                            className="w-10 h-10 rounded border bg-white object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {item.variant.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatVND(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="text-xs text-gray-500">
                      <p>
                        Ordered by:
                        <span className="font-semibold text-gray-700">
                          {" "}
                          {order.user.name}
                        </span>
                      </p>
                      <p>
                        Email:
                        <span className="font-semibold text-gray-700">
                          {" "}
                          {order.user.email}
                        </span>
                      </p>
                    </div>
                    <div className="w-full sm:w-auto text-right">
                      <div className="flex justify-between sm:justify-end gap-10 text-xs text-gray-500 mb-1">
                        <span>Subtotal</span>
                        <span>{formatVND(order.subTotal)}</span>
                      </div>
                      <div className="flex justify-between sm:justify-end gap-10 text-xs text-gray-500 mb-1">
                        <span>Discount</span>
                        <span className="text-green-600">
                          -{formatVND(order.otherPrice.discount)}
                        </span>
                      </div>
                      <div className="flex justify-between sm:justify-end gap-10 text-xs text-gray-500 mb-2">
                        <span>Shipping</span>
                        <span className="text-green-600">
                          {order.otherPrice.shippingFee === 0
                            ? "Free"
                            : order.otherPrice.shippingFee}
                        </span>
                      </div>
                      <div className="flex justify-between sm:justify-end gap-10 text-sm font-bold text-gray-900 border-t border-gray-100 pt-2">
                        <span>Order Total</span>
                        <span>{formatVND(order.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
          <div className="text-gray-300 mb-4">
            <i className="fa-solid fa-magnifying-glass text-6xl"></i>
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            No orders found
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
            We couldn't find any orders matching your current selection. Try
            changing your filters or start shopping for your pets!
          </p>
          <Link
            to={"/store"}
            className="bg-[#ff7e20] hover:bg-[#e66d15] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-orange-100"
          >
            Start Shopping
          </Link>
        </div>
      )}
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
