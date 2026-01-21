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
