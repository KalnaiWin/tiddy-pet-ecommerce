export interface ItemOrder {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface SourceOrderCreatedInput {
  items: ItemOrder[];
  shippingFee: number;
  voucherId: string;
  discount: number;
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
