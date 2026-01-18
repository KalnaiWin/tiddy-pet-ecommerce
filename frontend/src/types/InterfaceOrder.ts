import type { UserOrderInfo } from "./InterfaceUser";

export interface OrderInfo {
  _id: string;
  user: UserOrderInfo;
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
  checkoutStatus: "idle" | "loading" | "succeeded" | "failed";
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
