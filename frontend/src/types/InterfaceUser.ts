import {
  BadgeCheck,
  Beef,
  ChartColumn,
  ChartLine,
  ClipboardList,
  Heart,
  History,
  Home,
  Layers,
  LucideUser2,
  Package,
  Pill,
  Shapes,
  Shield,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";

export type UserRole = "CUSTOMER" | "ADMIN" | "SHIPPER";

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  imageProfile: String;
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
  currentUser: User | null;
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
    { id: "ADMIN", label: "Admin", icon: Shield, desc: "Manage inventory" },
    { id: "SHIPPER", label: "Shipper", icon: Truck, desc: "Handle deliveries" },
  ];

export const pathCategorySelects = [
  {
    name: "All products",
    icon: Store,
    path: "/store",
  },
  {
    name: "Vitaim & Nutrition",
    icon: Pill,
    path: "/store/nutrition",
  },
  {
    name: "Yummy Food",
    icon: Beef,
    path: "/store/food",
  },
  {
    name: "Toys",
    icon: Shapes,
    path: "/store/toy",
  },
];

export const pathUserSelect = [
  {
    name: "Order History",
    icon: History,
    path: "/order",
  },
  {
    name: "Wishlist",
    icon: Heart,
    path: "/wishlist",
  },
];

export const pathAdminSelect = [
  {
    name: "Dashboard",
    icon: BadgeCheck,
    path: "/admin/dashboard",
  },
];

export const pathShipperSelect = [
  {
    name: "Orders",
    icon: ClipboardList,
    path: "/shipper",
  },
  {
    name: "Static",
    icon: ChartLine,
    path: "/shipper/static",
  },
];

export const adminNavBarSelect = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/admin/dashboard",
  },
  {
    name: "Analytic",
    icon: ChartColumn,
    path: "/admin/analytic",
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
