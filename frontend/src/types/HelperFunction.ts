import {
  Ban,
  CheckCheck,
  CheckCircle,
  Clock,
  HelpCircle,
  List,
  Package,
  Truck,
  UserCheck,
  XCircle,
} from "lucide-react";

export const StatusColor = (text: string) => {
  switch (text) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "INACTIVE":
      return "bg-gray-100 text-gray-800";
    case "BUSY":
      return "bg-yellow-100 text-yellow-800";
    case "BANNED":
      return "bg-red-100 text-red-800";
    default:
      break;
  }
};

export const VerifyStatus = (text: string) => {
  switch (text) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      break;
  }
};

export const StatusProduct = (text: string) => {
  switch (text) {
    case "Available":
      return "text-green-500 bg-green-100";
    case "Out of stock":
      return "text-red-500 bg-red-100";
    case "Draft":
      return "text-slate-500 bg-slate-100";
    default:
      break;
  }
};

export const roleUserColor = (text: string) => {
  switch (text) {
    case "ADMIN":
      return "bg-orange-100 text-orange-700";
    case "SHIPPER":
      return "bg-green-100 text-green-700";
    case "CUSTOMER":
      return "bg-blue-100 text-blue-700";
    default:
      break;
  }
};

export const convertSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // space → -
    .replace(/-+/g, "-"); // nhiều - → 1
};

export const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const statusOrderColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";
    case "ASSIGNED":
      return "bg-indigo-100 text-indigo-700";
    case "PICKING":
      return "bg-purple-100 text-purple-700";
    case "SHIPPING":
      return "bg-cyan-100 text-cyan-700";
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "CANCELLED":
      return "bg-red-300 text-red-900";
    case "ALL":
      return "bg-orange-300 text-orange-900";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const statusOrderIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return Clock;
    case "CONFIRMED":
      return CheckCircle;
    case "ASSIGNED":
      return UserCheck;
    case "PICKING":
      return Package;
    case "SHIPPING":
      return Truck;
    case "DELIVERED":
      return CheckCheck;
    case "FAILED":
      return XCircle;
    case "CANCELLED":
      return Ban;
    case "ALL":
      return List;
    default:
      return HelpCircle;
  }
};

export const paymentStatusColor = (status: string): string => {
  switch (status) {
    case "UNPAID":
      return "bg-red-100 text-red-700";
    case "PAID":
      return "bg-green-100 text-green-700";
    case "REFUNDED":
      return "bg-red-100 text-red-700";
    case "ALL":
      return "bg-orange-300 text-orange-900";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const generateOrderCode = (orderId: string, userId: string) => {
  const userPart = userId.slice(-4).toUpperCase();
  const orderPart = orderId.slice(-4).toUpperCase();

  return `U${userPart}-O${orderPart}`;
};

export const fillColorStatusOrder = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "#FACC15"; // yellow-400
    case "CONFIRMED":
      return "#3B82F6"; // blue-500
    case "ASSIGNED":
      return "#6366F1"; // indigo-500
    case "PICKING":
      return "#8B5CF6"; // purple-500
    case "SHIPPING":
      return "#06B6D4"; // cyan-500
    case "DELIVERED":
      return "#22C55E"; // green-500
    case "FAILED":
      return "#EF4444"; // red-500
    case "CANCELLED":
      return "#991B1B"; // red-800
    case "ALL":
      return "#F97316"; // orange-500
    default:
      return "#64748B"; // slate-500
  }
};
