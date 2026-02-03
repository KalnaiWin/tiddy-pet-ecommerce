import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { getSpecificOrderForAdmin } from "../../feature/orderThunk";
import {
  Calendar,
  ChevronLeft,
  CreditCard,
  Mail,
  MapPin,
  Notebook,
  Package,
  Phone,
  Printer,
  Tag,
  Truck,
  Users,
} from "lucide-react";
import {
  formatVND,
  generateOrderCode,
  statusOrderColor,
  statusOrderIcon,
} from "../../types/HelperFunction";
import SelectShipperDeliver from "./SelectShipperDeliver";

const ViewOrderInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { ordersDetailAdmin } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(getSpecificOrderForAdmin({ id: id }));
    }
  }, [id, dispatch, ordersDetailAdmin]);

  if (!ordersDetailAdmin) return <div>Empty</div>;

  const StatusIcon = statusOrderIcon(String(ordersDetailAdmin?.status));

  return (
    <div className="relative w-full min-h-screen bg-slate-50 p-5">
      <Link
        to={"/admin/order"}
        className="flex items-center text-slate-500 font-medium text-sm absolute top-5 left-5"
      >
        <ChevronLeft className="size-5" />
        Back to Order List
      </Link>
      {/* Header */}
      <div className="flex md:flex-row flex-col w-full justify-between pt-8 pb-5">
        <div className="flex md:flex-col flex-row gap-1">
          <div className="flex gap-3 items-center">
            <h1 className="font-extrabold text-xl">
              Order #
              {ordersDetailAdmin?.user?._id &&
                generateOrderCode(
                  ordersDetailAdmin?._id,
                  ordersDetailAdmin?.user._id,
                )}
            </h1>
            <div
              className={`flex items-center gap-2 px-2 py-0.5 rounded-full text-sm ${statusOrderColor(String(ordersDetailAdmin?.status))}`}
            >
              <StatusIcon className="size-5" />
              <p className="font-semibold">{ordersDetailAdmin?.status}</p>
            </div>
          </div>
          <div className="flex items-center text-slate-500 gap-1 text-sm">
            <Calendar className="size-5" />
            Order created on{" "}
            {new Date(ordersDetailAdmin?.createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="flex items-center px-2 py-1.5 rounded-md shadow-2xl border gap-2 hover:bg-slate-200 cursor-pointer">
            <Printer />
            Invoice
          </button>
          <button className="flex items-center px-2 py-1.5 rounded-md text-white bg-black hover:bg-slate-600 cursor-pointer">
            Manage Order
          </button>
        </div>
      </div>
      {/* General information */}
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col gap-1 bg-white shadow-2xs border border-slate-300 rounded-md py-1 px-2">
          <h1 className="uppercase font-semibold text-sm text-slate-400 tracking-widest">
            Total Amount
          </h1>
          <p className="font-black">
            {formatVND(ordersDetailAdmin?.totalPrice)}
          </p>
        </div>
        <div className="flex flex-col gap-1 bg-white shadow-2xs border border-slate-300 rounded-md py-1 px-2">
          <h1 className="uppercase font-semibold text-sm text-slate-400 tracking-widest">
            Payment Method
          </h1>
          <p className="font-black">{ordersDetailAdmin?.payment?.method}</p>
        </div>
        <div className="flex flex-col gap-1 bg-white shadow-2xs border border-slate-300 rounded-md py-1 px-2">
          <h1 className="uppercase font-semibold text-sm text-slate-400 tracking-widest">
            Items Count
          </h1>
          <p className="font-black">
            {Number(ordersDetailAdmin?.items?.length)}
          </p>
        </div>
        <div className="flex flex-col gap-1 bg-white shadow-2xs border border-slate-300 rounded-md py-1 px-2">
          <h1 className="uppercase font-semibold text-sm text-slate-400 tracking-widest">
            Shipping Status
          </h1>
          <p
            className={`font-black ${statusOrderColor(ordersDetailAdmin?.status === "DELIVERED" ? ordersDetailAdmin?.status : "PENDING")}`}
          >
            {ordersDetailAdmin?.status === "DELIVERED"
              ? ordersDetailAdmin?.status
              : "PENDING"}
          </p>
        </div>
      </div>
      {/* Specific information */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6 xl:grid-rows-7">
        {/* Product */}
        <div className="w-full mt-5 bg-white rounded-md shadow-xl md:col-span-2 xl:col-span-4 xl:row-span-4">
          <div className="border-2 border-slate-100 rounded-md shadow-md">
            <h1 className="flex items-center font-bold text-xl gap-2 px-5 py-5">
              <Package className="text-orange-500" /> Product Details
            </h1>
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <td className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ">
                    Item
                  </td>
                  <td className="py-3 px-6 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Price
                  </td>
                  <td className="py-3 px-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Discount
                  </td>
                  <td className="py-3 px-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Quantity
                  </td>
                  <td className="py-3 px-6 text-end text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subtotal
                  </td>
                </tr>
              </thead>
              <tbody>
                {ordersDetailAdmin?.items?.map((item, idx) => {
                  return (
                    <tr
                      key={item?.variant?._id || idx}
                      className="border-b-2 border-slate-200 hover:bg-orange-100 transition"
                    >
                      <td className="py-3 pl-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item?.variant?.image}
                            alt={item?.product?.name}
                            className="size-12 rounded-lg border border-slate-200 object-cover"
                          />
                          <div className="flex flex-col text-sm">
                            <span className="font-medium text-slate-800 line-clamp-1">
                              {item?.product?.name}
                            </span>
                            {item?.variant?.name !== item?.product?.name && (
                              <span className="text-xs text-slate-500">
                                Variant: {item?.variant?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-sm font-medium text-slate-700 px-4 text-center">
                        {formatVND(item?.price)}
                      </td>
                      <td className="text-sm font-medium text-slate-700 text-center">
                        {item?.variant?.discount}
                        {" %"}
                      </td>
                      <td className="text-sm text-slate-600 text-center">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                          × {item?.quantity}
                        </span>
                      </td>
                      <td className="text-sm font-semibold text-slate-900 px-4 text-center">
                        {formatVND(item?.price * item?.quantity)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-col items-end p-5">
              <div className="flex items-center gap-10 w-50 justify-between">
                <p className="text-sm text-slate-500">Subtotal</p>
                <p className="text-md font-semibold">
                  {formatVND(ordersDetailAdmin?.subTotal)}
                </p>
              </div>
              <div className="flex items-center gap-10 w-50 justify-between">
                <p className="text-sm text-slate-500">Shipping Fee</p>
                <p className="text-md font-semibold text-green-500">Free</p>
              </div>
              <div className="flex items-center gap-10 w-50 justify-between">
                <p className="text-sm flex items-center gap-2 text-red-400">
                  <Tag className="size-4" /> Discount
                </p>
                <p className="text-md font-semibold text-red-600">
                  {formatVND(ordersDetailAdmin?.otherPrice?.discount)}
                </p>
              </div>
              <hr className="w-full text-slate-700 h-0.5 my-3" />
              <div className="flex items-center gap-10 w-50 justify-between">
                <p className="text-lg font-bold">Final Total</p>
                <p className="text-md font-bold text-orange-600">
                  {formatVND(ordersDetailAdmin?.totalPrice)}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2"></div>
        </div>
        {/* User */}
        <div className="w-full mt-5 bg-white rounded-md shadow-xl md:col-span-2 xl:col-span-2 xl:row-span-3 min-h-80">
          <div className="border border-slate-100 rounded-md shadow-2xl relative min-h-full">
            {/* Image profile */}
            <div className="relative w-full h-24 bg-linear-to-r from-orange-300 to-orange-600 py-10 rounded-t-md">
              <div className="absolute flex flex-col items-center justify-center w-full -bottom-30">
                <div className="bg-white p-2 rounded-xl">
                  <img
                    src={ordersDetailAdmin?.user?.image_profile}
                    alt=""
                    className="object-cover size-24 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-5">
                  <h1 className="text-2xl font-bold">
                    {ordersDetailAdmin?.user?.name}
                  </h1>
                  <p className="text-slate-400 text-sm">
                    {ordersDetailAdmin?.user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full absolute bottom-0 px-3 py-2 gap-1">
              <button className="flex items-center gap-2 bg-black hover:opacity-70 p-1 border border-black text-white justify-center text-sm rounded-md">
                <Mail className="size-4" /> Send Email
              </button>
              <Link
                to={"/admin/account"}
                className="flex items-center gap-2 p-1 border hover:opacity-70 border-slate-300 justify-center text-sm rounded-md"
              >
                <Users className="size-4" />
                View Customer
              </Link>
            </div>
          </div>
        </div>
        {/* Choose shipper */}
        <div className="bg-white rounded-md p-2 shadow-xl md:col-span-2 xl:col-span-2 xl:row-span-5">
          {ordersDetailAdmin.status !== "CONFIRMED" &&
          ordersDetailAdmin.status !== "ASSIGNED" ? (
            <div className="text-red-500 font-bold text-center flex min-h-full items-center justify-center">
              Can not choose shipper for orders are not confirmed or assigned 😔
            </div>
          ) : (
            <SelectShipperDeliver orderId={ordersDetailAdmin?._id} />
          )}
        </div>
        {/* Shipping */}
        <div className="bg-white rounded-md shadow-xl md:col-span-2 xl:col-span-4 xl:row-span-3">
          <h1 className="flex items-center font-bold text-xl gap-2 px-5 py-5">
            <Truck className="text-blue-500" />
            Shipping & Logistics
          </h1>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-8 w-full pb-5">
              <div className="flex gap-2 px-5">
                <MapPin className="text-blue-600 bg-blue-200 rounded-md p-1 size-8" />
                <div className="flex flex-col">
                  <h1 className="uppercase text-slate-400 font-bold text-sm">
                    Delivery Address
                  </h1>
                  <p className="font-bold text-sm">
                    {ordersDetailAdmin?.shipping?.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 px-5">
                <Calendar className="text-purple-600 bg-purple-200 rounded-md p-1 size-8" />
                <div className="flex flex-col">
                  <h1 className="uppercase text-slate-400 font-bold text-sm">
                    Expected Delivery
                  </h1>
                  <p className="font-bold text-sm">
                    {new Date(
                      ordersDetailAdmin?.shipping?.assignedAt,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 px-5">
                <Phone className="text-green-600 bg-green-200 rounded-md p-1 size-8" />
                <div className="flex flex-col">
                  <h1 className="uppercase text-slate-400 font-bold text-sm">
                    Phone Number
                  </h1>
                  <p className="font-bold text-sm">
                    {ordersDetailAdmin?.shipping?.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-3 border-l-8 border-yellow-500 bg-yellow-50 py-4 w-full">
              <h1 className="flex gap-2 uppercase">
                <Notebook className="text-amber-600 size-4" />
                Customer Note
              </h1>
              <p className="font-bold text-sm">
                "Please call before arriving, deliver to the front desk"
              </p>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className="bg-white shadow-xl rounded-md md:col-span-2 xl:col-span-4 xl:row-span-1">
          <h1 className="flex items-center font-bold text-xl gap-2 py-5 px-5">
            <CreditCard className="text-green-500" />
            Payment Status
          </h1>
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Completed
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 hover:bg-slate-50 transition">
                <td className="py-4 px-6 text-sm font-medium text-slate-700">
                  {ordersDetailAdmin?.payment?.method || "-"}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
            ${
              ordersDetailAdmin?.payment?.status === "PAID"
                ? "bg-green-100 text-green-700"
                : ordersDetailAdmin?.payment?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
                  >
                    {ordersDetailAdmin?.payment?.status || "UNKNOWN"}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600">
                  {ordersDetailAdmin?.payment?.paidAt
                    ? new Date(
                        ordersDetailAdmin?.payment?.paidAt,
                      ).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-5">
            <div className="flex flex-col p-5 rounded-md w-full bg-green-100">
              <h1 className="text-green-600 font-bold uppercase text-sm">
                Coupon Applied
              </h1>
              <p className="text-green-800 font-extrabold">
                #CODE_TIDDY_PEY_SHOP
              </p>
              <p className="text-xs text-green-500">Extra saving applied</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderInformation;
