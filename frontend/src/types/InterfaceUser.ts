import {
  Blocks,
  ChartColumn,
  History,
  Home,
  Layers,
  LucideUser2,
  Package,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  StoreIcon,
  Truck,
  User2,
  UserCogIcon,
  Van,
} from "lucide-react";

export type UserRole = "CUSTOMER" | "ADMIN" | "SHIPPER";

export interface UserOrderInfo {
  _id: string;
  name: string;
  email: string;
  image_profile: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  image_profile: string;
  phone: string;
  address: string;
  totalSpend: number;
  status: string;
}

export interface AccountUpdateInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  shipper_info: {
    vehicle_type: string;
    license_number: string;
    verification_status: string;
  };
  status: string;
}
export interface AccountCustomerEdit {
  name: string;
  image_profile: string;
  phone: string;
  address: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  totalSpend: number;
  shipper_info: {
    vehicle_type: string;
    license_number: string;
    verification_status: string;
  };
  phone: string;
  address: string;
  image_profile: string;
  status: string;
  createdAt: Date;
}

export interface UserState {
  currentUser: UserInfo | null;
  users: UserInfo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  usersStatus: "idle" | "loading" | "succeeded" | "failed";
  detailAccount: UserInfo | null;
  statusDetail: "idle" | "loading" | "succeeded" | "failed";
  deletingStatus: "idle" | "loading" | "succeeded" | "failed";
  updatingStatus: "idle" | "loading" | "succeeded" | "failed";
}

export const roles: { id: UserRole; label: string; icon: any; desc: string }[] =
  [
    {
      id: "CUSTOMER",
      label: "Customer",
      icon: ShoppingBag,
      desc: "Shop & track orders",
    },
    { id: "SHIPPER", label: "Shipper", icon: Truck, desc: "Handle deliveries" },
  ];

export const adminNavBarSelect = [
  {
    name: "Dashboard",
    icon: ChartColumn,
    path: "/admin/dashboard",
  },
  {
    name: "Account",
    icon: LucideUser2,
    path: "/admin/account",
  },
  {
    name: "Store",
    icon: Layers,
    path: "/admin/store",
  },
  {
    name: "Order",
    icon: Package,
    path: "/admin/order",
  },
];

export const customerNavbarSelect = [
  {
    icon: Home,
    name: "Home",
    path: "/",
  },
  {
    icon: UserCogIcon,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: StoreIcon,
    name: "Shopping",
    path: "/store",
  },
  {
    icon: PackageCheck,
    name: "History Order",
    path: "/history",
  },
  {
    icon: ShoppingCart,
    name: "Cart",
    path: "/cart",
  },
];

export const shipperNavbarSelect = [
  {
    icon: Home,
    name: "Home",
    path: "/",
  },
  {
    icon: User2,
    name: "Profile",
    path: "/shipper/profile",
  },
  {
    icon: Blocks,
    name: "Orders",
    path: "/shipper/order",
  },
  {
    icon: PackageCheck,
    name: "Available",
    path: "/shipper/available",
  },
  {
    icon: Van,
    name: "Delivery",
    path: "/shipper/delivery",
  },
  {
    icon: History,
    name: "History",
    path: "/shipper/history",
  },
];
