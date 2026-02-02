import { Dot, Download, Eye, Filter, Search } from "lucide-react";
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
import { Link } from "react-router-dom";
import SkeletonOrderManagement from "../../components/common/(admin)/SkeletonOrderManagement";

const OrderInformation = () => {
  const { orders, status } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div className="w-full p-5 bg-slate-100 min-h-screen flex flex-col gap-5">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">Management Orders</h1>
          <p className="text-md text-slate-500">
            View and handle all incoming orders
          </p>
        </div>
        <div className="flex gap-5">
          <button className="flex gap-2 items-center font-semibold bg-white border px-5 py-3 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer">
            <Download />
            Export
          </button>
        </div>
      </div>
      <div className="w-full border rounded-md py-3 grid grid-cols-7 gap-2 px-5 bg-orange-100">
        <div className="relative col-span-3 bg-white rounded-md border">
          <input
            type="text"
            className="w-full p-1 rounded-md indent-7"
            placeholder="Search order by Id"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <Search className="absolute top-1 left-1 font-thin text-slate-500" />
        </div>
        <div className="relative col-span-2 bg-white rounded-md border">
          <div className="relative col-span-4 rounded-md">
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full p-1 rounded-md indent-7 focus:outline-none text-center"
            >
              <option value="">-- Select status order --</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="PICKING">PICKING</option>
              <option value="SHIPPING">SHIPPING</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="FAILED">FAILED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <Filter className="absolute top-1 left-1 font-thin text-slate-500" />
          </div>
        </div>
        <div className="relative col-span-2 bg-white rounded-md border">
          <div className="relative col-span-4 rounded-md">
            <select
              value={filter.payment}
              onChange={(e) =>
                setFilter({ ...filter, payment: e.target.value })
              }
              className="w-full p-1 rounded-md indent-7 focus:outline-none text-center"
            >
              <option value="">-- Select payment method --</option>
              <option value="UNPAID">UNPAID</option>
              <option value="PAID">PAID</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
            <Filter className="absolute top-1 left-1 font-thin text-slate-500" />
          </div>
        </div>
      </div>
      {orders && orders.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {status === "loading"
              ? Array.from({ length: 7 }).map((_, idx) => (
                  <SkeletonOrderManagement key={`skeleton-order-${idx}`} />
                ))
              : orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`hover:bg-orange-50 transition-colors ${idx % 2 ? "bg-white" : "bg-white/40"} `}
                  >
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <div className="flex flex-col">
                        <p className="font-extrabold uppercase">
                          #{generateOrderCode(order._id, order.user._id)}
                        </p>
                        <p>
                          {new Date(order.createdAt).toLocaleDateString(
                            "vi-VN",
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            order.user?.image_profile || "/src/asset/Empty.webp"
                          }
                          alt={order.user?.name || "Customer avatar"}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {order.user?.name || "Unknown"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {order.user?.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {formatVND(order.totalPrice)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`pr-3 py-1 rounded-full text-xs font-medium ${statusOrderColor(order.status)} flex items-center w-fit`}
                      >
                        <Dot />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-sm">
                        <span
                          className={`font-medium flex items-center w-fit pr-3 py-1 rounded-full text-xs ${paymentStatusColor(order.payment.status)}`}
                        >
                          <Dot />

                          {order.payment?.status}
                        </span>
                        <span className="text-slate-500">
                          {order.payment?.status === "UNPAID"
                            ? ""
                            : order.payment?.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="p-2 rounded hover:bg-slate-700 justify-center transition flex items-center gap-2 w-full bg-slate-950 text-white"
                        title="View order"
                      >
                        <Eye size={18} />
                        <p>View</p>
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 md:py-16">
          <div className="text-slate-400 mb-4">
            <Search className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <p className="text-orange-600 text-sm sm:text-base font-medium">
            No orders found
          </p>
          <p className="text-orange-400 text-xs sm:text-sm mt-1">
            Try adjusting your search
          </p>
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

export default OrderInformation;
