import type { ProductInfo } from "./InterfaceProduct";

export interface CartState {
  cartItems: null;
  cartArray: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  deletingStatus: "idle" | "loading" | "succeeded" | "failed";
}

export interface CartRequestInput {
  productId: string;
  quantity: number;
}

export interface CartItem {
    product: ProductInfo;
    quantity: number;
}

