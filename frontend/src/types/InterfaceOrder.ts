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
  otherPrice: { discount: number; shippingFee: number };
  payment: {
    status: string;
    method: string;
  };
}

export interface OrderCreateInput {
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
  }>;
  shippingFee: number;
  voucherId: string;
}

export interface OrderCreateOutput {
  user: string;
  items: [
    {
      productId: string;
      variantId: string;
      quantity: number;
      price: number;
    },
  ];
  otherPrice: {
    discount: number;
    shippingFee: number;
  };
  voucher: string;
  totalPrice: number;
  subTotal: number;
  shipping: {
    address: string;
    phone: string;
  };
  predictedDayShipping: Date;
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
