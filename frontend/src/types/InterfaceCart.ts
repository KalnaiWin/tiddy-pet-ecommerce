import type { Brand, Category } from "./InterfaceProduct";

export interface CartState {
  cartItems: null;
  cartArray: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  deletingStatus: "idle" | "loading" | "succeeded" | "failed";
}

export interface CartRequestInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
  productDiscount: number;
  brand: Brand;
  category: Category[];
}

