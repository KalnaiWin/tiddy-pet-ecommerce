export interface ItemOrder {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface SourceOrderCreatedInput {
  items: ItemOrder[];
  shippingFee: number;
  voucherId: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface QueryOrderManagement {
  page: number;
  limit: number;
  search: string;
  status: string;
  payment: string;
}

export interface CheckOutInput {
  userId: string;
  items: Array<{
    name: string;
    image: string[];
    price: number;
    quantity: number;
  }>;
}

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "ASSIGNED",
  "PICKING",
  "SHIPPING",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
