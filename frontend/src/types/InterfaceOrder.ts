import type { UserOrderInfo } from "./InterfaceUser";

export interface OrderVariant {
  _id: string;
  name: string;
  image: string;
  price: string;
}

export interface ItemsOrder {
  productId: string;
  variant: OrderVariant;
  quantity: number;
  price: number;
}

export interface OrderInfo {
  _id: string;
  user: UserOrderInfo;
  items: ItemsOrder[];
  createdAt: Date;
  totalPrice: number;
  status: string;
  payment: {
    status: string;
    method: string;
  };
}

export interface initialOrder {
  orders: OrderInfo[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface CheckOut {
  userId: string;
  items: Array<{
    name: string;
    image: string[];
    price: number;
    quantity: number;
  }>;
}

export const StatusOrder = [
  {
    name: "All",
  },
  {
    name: "Pending",
  },
  {
    name: "Confirmed",
  },
  {
    name: "Assigned",
  },
  {
    name: "Picking",
  },
  {
    name: "Shipping",
  },
  {
    name: "Delivered",
  },
  {
    name: "Failed",
  },
  {
    name: "Cancelled",
  },
];

export const PaymentStatusOrder = [
  {
    name: "All",
  },
  {
    name: "Unpaid",
  },
  {
    name: "Paid",
  },
  {
    name: "Refunded",
  },
];
