import { Shield, ShoppingBag, Truck } from "lucide-react";

export type UserRole = "CUSTOMER" | "ADMIN" | "SHIPPER";

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
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
