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
  subTotal: number;
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
    shipper: {};
  };
  status: string;
  predictedDayShipping: Date;
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
  };
  variant: {
    _id: string;
    name: string;
    price: number;
    image: string;
    discount: number;
  };
  quantity: number;
  price: number;
}

export interface OrderDetailsForAdmin {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    image_profile: string;
  };
  items: OrderItem[];
  otherPrice: {
    discount: number;
    shippingFee: number;
  };
  totalPrice: number;
  subTotal: number;
  payment: {
    method: string;
    status: string;
    paidAt: Date;
  };
  shipping: {
    address: string;
    phone: string;
    note: string;
    shipper: {
      _id: string;
      name: string;
      email: string;
      role: string;
      phone: string;
      address: string;
      image_profile: string;
      shipper_info: {
        vehicle_type: string;
        license_number: string;
        verification_status: string;
      };
    };
    assignedAt: Date;
  };
  predictedDayShipping: Date;
  status: string;
  cancel: {
    reason: string;
    cancelledBy: string;
    cancelledAt: Date;
  };
  deliveryFailed: {
    reason: string;
    failedAt: Date;
  };
  createdAt: Date;
}

export interface initialOrder {
  orders: OrderInfo[] | [];
  ordersDetailAdmin: OrderDetailsForAdmin | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  orderStatusDis: OrderStatusDistribution | null;
  distributionStatus: "idle" | "loading" | "succeeded" | "failed";
  revenue: RevenueTime[] | [];
  revenueStatus: "idle" | "loading" | "succeeded" | "failed";
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

export interface OrderStatusDistribution {
  PENDING: number;
  CONFIRMED: number;
  ASSIGNED: number;
  PICKING: number;
  SHIPPING: number;
  DELIVERED: number;
  FAILED: number;
  CANCELLED: number;
}

export interface RevenueTime {
  label: string;
  revenue: number;
  totalOrder: number;
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
