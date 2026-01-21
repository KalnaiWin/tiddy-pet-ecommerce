import type { Types } from "mongoose";
import type { tagInput } from "./product.interface.js";

export type Cart = {
  userId: string;
  item: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
};

export interface cartAddedItem {
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
}

export interface VariantWithProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  image: string;
  productId: {
    _id: Types.ObjectId;
    discount: number;
    brand: tagInput;
    category: tagInput[];
    name: string;
  };
}
